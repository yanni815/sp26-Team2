console.log("Script is running");

function signup() {
  fetch("http://localhost:8080/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      phone_number: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      numberOfChildren: document.getElementById("children").value
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("SIGNUP RESPONSE:", data);

      const user = {
        id: data.id || data.user?.id,
        name: data.name || data.user?.name,
        email: data.email || data.user?.email
      };

      localStorage.setItem("user", JSON.stringify(user));


      window.location.href = "dashboard.html";
    })
    .catch(err => console.error("Signup error:", err));
}

async function login() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  const response = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();

  console.log("LOGIN RESPONSE:", data);

  if (!data || !data.id) {
    alert("Invalid login");
    return;
  }

 
  window.location.href = "dashboard.html";
}

function loadParentName() {
  const name = localStorage.getItem("parentName");

  console.log("LOADED FROM STORAGE:", name);

  const el = document.getElementById("userName");

  if (el) {
    el.textContent = `Welcome ${name || "Parent"}`;
  }

}

function loadBabysitters() {
  const container = document.getElementById("babysitterContainer");

  if (!container) return;

  fetch("http://localhost:8080/babysitters")
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      data.forEach(sitter => {
        const card = document.createElement("div");
        card.className = "card";


        card.innerHTML = `
    <h3>${sitter.name} ⭐ ${sitter.rating}</h3>
    <p>${sitter.hourlyRate}/hr</p>
    <p>Verified: ${sitter.verifiedStatus ? "Yes ✅" : "No ❌"}</p>
    <a href="profile.html?name=${encodeURIComponent(sitter.name)}">
        <button>View Profile</button>
    </a>
    `;
        container.appendChild(card);

      });

    })
    .catch(err => console.error("loadBabysitters error:", err));
}


function loadProfile() {
  if (!document.getElementById("name")) return;

  const params = new URLSearchParams(window.location.search);
  const nameFromURL = params.get("name");

  console.log("URL name:", nameFromURL);

  if (!nameFromURL) return;

  fetch("http://localhost:8080/babysitters")
    .then(res => res.json())
    .then(data => {
      const sitter = data.find(s => s.name === nameFromURL);

      console.log("Found sitter:", sitter);

      if (!sitter) return;

      const nameEl = document.getElementById("name");
      if (nameEl) {
        nameEl.innerText = sitter.name;
      }


      const ratingEl = document.getElementById("rating");
      if (ratingEl) {
        ratingEl.innerText = "Rating: ⭐" + sitter.rating;
      }

      const rateEl = document.getElementById("rate");
      if (rateEl) {
        rateEl.innerText = "$" + sitter.hourlyRate + "/hr";
      }

      const verifiedEl = document.getElementById("verified");
      if (verifiedEl) {
        verifiedEl.innerText = sitter.verifiedStatus ? "✔ Verified" : "⚠ Not Verified";
      }

      const messageLink = document.getElementById("messageLink");

      if (!messageLink) {
        console.error("name not found");
        return;
      }
      messageLink.href =
        "messages.html?name=" + encodeURIComponent(sitter.name);


      const bookLink = document.getElementById("bookLink");

      if (!bookLink) {
        console.error("bookLink not found in html.");
        return;
      }

      bookLink.href =
        "booking.html?name=" + encodeURIComponent(sitter.name);
      console.log("Link set:", bookLink.href);

    })
    .catch(err => console.error("loadBabysitters error:", err));
}


const params = new URLSearchParams(window.location.search);
const name = new URLSearchParams(window.location.search).get("name");
console.log("Booking for:", name);

function loadBookingPageName() {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("URL:", window.location.href);

    const title = document.getElementById("babysitterName");
    if (!title) return;

    const params = new URLSearchParams(window.location.search);
    const name = new URLSearchParams(window.location.search).get("name");


    console.log("Booking page name:", name);


    if (name) {
      title.innerText = "Book " + name;
    }
  });
}

function calculateCurrentCost() {
  const start = parseInt(document.getElementById("startTime").value);
  const end = parseInt(document.getElementById("endTime").value);

  if (isNaN(start) || isNaN(end)) return 0;

  const hours = end - start;
  if (hours <= 0) return 0;

  const rate = 18;
  return hours * rate;
}

function calculateCost() {
  const costEl = document.getElementById("cost");
  if (!costEl) return;

  costEl.innerText = calculateCurrentCost();

  console.log("Calculated cost is running");
}

function confirmBooking() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  console.log("URL:", window.location.href);
  console.log("BOOKING NAME", name);

  const date = document.getElementById("date").value;
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;

  const cost = calculateCurrentCost();

  console.log("Saving booking:", {
    name, date, start, end, cost
  });

  if (!name || !date || !start || !end || cost <= 0) {
    alert("Please complete all fields.");
    return;
  }

  const booking = {
    babysitterName: name,
    date,
    startTime: start,
    endTime: end,
    totalCost: cost
  };

  fetch("http://localhost:8080/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(booking)
  })
    .then(() => {
      document.getElementById("message").innerText =
        "Booking confirmed!";
    })
    .catch(err => console.error(err));
}

function loadBookings() {
  const container = document.getElementById("bookingsContainer");
  if (!container) return;

  fetch("http://localhost:8080/bookings")
    .then(res => res.json())
    .then(data => {

      if (!Array.isArray(data)) {
        console.log("Backened error:", data);
        return;
      }


      container.innerHTML = "";

      const filtered = data.filter(b => b.status !== "CANCELLED");

      filtered.forEach(booking => {

        console.log("Booking:", booking);

        const card = document.createElement("div");
        card.className = "card";



        card.innerHTML = `
          <h3>${booking.babysitterName}</h3>
          <p>Date: ${booking.date}</p>
          <p>Time: ${booking.startTime} - ${booking.endTime}</p>
          <p>Total: $${booking.totalCost}</p>

          <p><strong>Status:</strong> ${booking.status || "Pending"}</p>

          <button onclick="payNow(${booking.id})"
          ${booking.status === "PAID" ? "disabled" : ""}>
           ${booking.status === "PAID" ? "Paid" : "Pay Now"}
           </button>

          <button onclick ="cancelBooking(${booking.id})" class ="delete-btn">Cancel</button>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => console.error("Delete error:", err));
}


function cancelBooking(id) {
  if (!confirm("Cancel this booking?")) return;

  fetch(`http://localhost:8080/bookings/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      loadBookings();
    })
    .catch(err => console.error("Delete error:", err));
}

function loadReviews() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const container = document.getElementById("reviewsContainer");
  if (!container) return;

  const reviews = JSON.parse(localStorage.getItem(name)) || [];

  container.innerHTML = "";

  reviews.forEach(r => {
    const p = document.createElement("p");
    p.innerText = "⭐" + r;
    container.appendChild(p);
  });

}

function addReview() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const input = document.getElementById("reviewInput");
  const review = input.value;

  if (!review) return;

  let reviews = JSON.parse(localStorage.getItem(name)) || [];
  reviews.push(review);

  localStorage.setItem(name, JSON.stringify(reviews));

  input.value = "";
  loadReviews();
}

function loadMessages() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;

  const messages = JSON.parse(localStorage.getItem("chat_" + name)) || [];

  chatBox.innerHTML = "";

  messages.forEach(msg => {
    const p = document.createElement("p");
    p.innerText = msg;
    chatBox.appendChild(p);
  });

}

function sendMessage() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const input = document.getElementById("messageInput");
  const msg = input.value;

  if (!msg) return;

  let messages = JSON.parse(localStorage.getItem("chat_" + name)) || [];
  messages.push("You: " + msg);

  localStorage.setItem("chat_" + name, JSON.stringify(messages));

  input.value = "";
  loadMessages();
}

function payNow(id) {
  fetch(`http://localhost:8080/bookings/${id}`)
    .then(res => res.json())
    .then(booking => {
      return fetch(`http://localhost:8080/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...booking,
          status: "PAID"
        })

      });
    })
    .then(() => loadBookings()) // refresh page
    .catch(err => {
      console.error("Payment error:", err);
    });

}


window.onload = function () {
  loadBabysitters();
  loadProfile();
  loadBookings();
  loadReviews();
  loadMessages();
  loadParentName();
};