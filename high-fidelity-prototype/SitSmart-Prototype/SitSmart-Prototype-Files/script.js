console.log("Script is running");

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(parent => {
      localStorage.setItem("parentName", parent.name);
      localStorage.setItem("userId", parent.id);

      window.location.href = "dashboard.html";
    })
    .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", loadParentName);

function loadParentName() {
  const name = localStorage.getItem("parentName");

  const el = document.getElementById("parentName");
  if (!el) return;

  el.innerText = name ? `Welcome ${name}` : "Welcome Parent";
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
    <a href="profile.html?name=${encodeURIComponent(sitter.name)}&id${sitter.id}">
        <button>View Profile</button>
    </a>
    `;

        container.appendChild(card);

      });

    })
    .catch(err => console.error(err));

}


function loadProfile() {
  console.log("loadProfile START");
  const params = new URLSearchParams(window.location.search);
  const sitterId = Number(params.get("id"));
  const sitterName = params.get("name");
  if (!sitterName) return;

  const nameEl = document.getElementById("name");
     if (nameEl) {
      nameEl.innerText = sitterName;
    }
  
  fetch("http://localhost:8080/babysitters")
    .then(res => res.json())
    .then(data => {

      console.log("ALL babysitters:", data);
      console.log("Looking for ID:", sitterId);
      const sitter = data.find(s => Number(s.id) === sitterId);

      console.log("Found sitter:", sitter);

      if (!sitter) {
        console.error("Sitter not found");
        return;

      }
      const ratingEl = document.getElementById("rating");
      if (ratingEl) {
        ratingEl.innerText = "Rating: ⭐ " + sitter.rating;
      }

      const rateEl = document.getElementById("rate");
      if (rateEl) {
        rateEl.innerText = "$" + sitter.hourlyRate + "/hr";
      }
      const verifiedEl = document.getElementById("verified");
      if (verifiedEl) {
        verifiedEl.innerText = sitter.verifiedStatus ? "✔ Verified" : "⚠ Not Verified";
      }

      console.log("ABOUT TO GET bookLink");

      const bookLink = document.getElementById("bookLink");
       console.log("bookLink element:", bookLink);

      if (!bookLink)  return;

      

      if (bookLink) {
        bookLink.href = 
        "booking.html?name=" + encodeURIComponent(sitter.name) + "&id=" + sitter.id;
      }
      console.log("Link set:", bookLink.href);


      const messageLink = document.getElementById("messageLink");
      if (!messageLink) {
        console.error("messageLink not found in html.");
        return;
      }
      messageLink.href = "messages.html?name=" + sitter.id;
         

    });
}



function loadBookingPageName() {
  const params = new URLSearchParams(window.location.search);
  const name = new URLSearchParams(window.location.search).get("name");

  console.log("Booking page name:", name);

  const title = document.getElementById("babysitterName");
  if (!title) return;

  if (name) {
    title.innerText = "Book " + name;
  }
}


function calculateCurrentCost() {
  const startEl = document.getElementById("startTime").value;
  const endEl = document.getElementById("endTime").value;

  if (!startEl || !endEl) return 0;

  const start = parseInt(document.getElementById("startTime").value);
  const end = parseInt(document.getElementById("endTime").value);

  const hours = end - start;
  if (hours <= 0) return 0;

  const rate = 18;
  return hours * rate;
}

function calculateCost() {
  const costEl = document.getElementById("cost");
  if (!costEl) return;

  costEl.innerText = calculateCurrentCost();
}
console.log("Calculated cost is running");


function confirmBooking() {
  const params = new URLSearchParams(window.location.search);
  const sitterId = params.get("id");
  const name = params.get("name");


  const date = document.getElementById("date").value;
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;

  const cost = calculateCurrentCost();

  if (!sitterId|| !date || !start || !end || cost <= 0) {
    alert("Please complete all fileds.");
    return;
  }

  const booking = {
    parent: { id: Number(localStorage.getItem("userId")) },
    babysitter: {id: sitterId},
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
  console.log("loadBookings is running");
  const container = document.getElementById("bookingsContainer");
  if (!container) return;

  fetch("http://localhost:8080/bookings")
    .then(res => res.json())
    .then(data => {
      console.log("RAW BOOKINGS:", data);

      if (!Array.isArray(data)) {
        console.log("Expected array but got:", data);
        return;
      }
      container.innerHTML = "";

      data.forEach(booking => {
        console.log("Booking:", booking);

        const card = document.createElement("div");
        card.className = "card";

         const paid = localStorage.getItem("paid_" + booking.babysitter?.name);

        card.innerHTML = `
          <h3>${booking.babysitter?.name|| "Unknown Babysitter"}</h3>
          <p>Date: ${booking.date}</p>
          <p>Time: ${booking.startTime} - ${booking.endTime}</p>
          <p>Total: $${booking.totalCost ?? 0}</p>

          <button onclick ="cancelBooking(${booking.id})" class ="delete-btn"> Cancel</button>
           <p>Status:</strong> ${booking.status || "Pending"}</p>

           <button onclick="payNow(${booking.id})"
          ${booking.status === "PAID" ? "disabled" : ""}>
           ${booking.status === "PAID" ? "Paid" : "Pay Now"}
           </button>
          <p style= "color: ${booking.status == 'CANCELLED' ? 'red' : 'green'};">
          ${booking.status || "Pending"}
          </p>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => console.error(err));
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
      return fetch(`http://localhost:8080/bookings/${id}`,{
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
window.onload= function () {
loadProfile();
loadBookings();
loadBabysitters();
loadParentName();
loadBookingPageName();
loadMessages();
loadReviews();
}
