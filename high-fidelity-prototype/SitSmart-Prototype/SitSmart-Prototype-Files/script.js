console.log("Script is running");

function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
    .then(res => res.json()) 
    .then(parent => {
      localStorage.setItem("parentName", parent.name);

      window.location.href = "dashboard.html";
    })
    .catch(err => console.error(err));
  }


  function loadParentName(){
    const name = localStorage.getItem("parentName");

    const el = document.getElementById("welcome");
    if(!el) return;

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
    <a href="profile.html?name=${encodeURIComponent(sitter.name)}">
        <button>View Profile</button>
    </a>
    `;

        container.appendChild(card);

      });

    })
    .catch(err => console.error(console.error(err)));

}


function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const nameFromUrl = params.get("name");
  if (!nameFromUrl) return;


  

  if (!name) {
    alert("Missing babysitter name");
    return;
  }
  fetch("http://localhost:8080/babysitters")
    .then(res => res.json())
    .then(data => {
      const sitter = data.find(s => s.name === nameFromUrl);

      console.log("Found sitter:", sitter);

      if (!sitter) {
        console.error("Sitter not found");
        return;

      }
      const nameEl = document.getElementById("name");
      if(nameEl){
        nameEl.innerText = sitter.name;
      }

      

      document.getElementById("rating").innerText = "Rating: ⭐ " + sitter.rating;
      document.getElementById("rate").innerText = "$" + sitter.hourlyRate + "/hr";
      document.getElementById("verified").innerText = sitter.verifiedStatus ? "✔ Verified" : "⚠ Not Verified";


      const bookLink = document.getElementById("bookLink");
      if (!bookLink) {
        console.error("bookLink not found in html.");
        return;
      }
      bookLink.href =
        "booking.html?name=" + encodeURIComponent(sitter.name);
      console.log("Link set:", bookLink.href);
    });

}


const params = new URLSearchParams(window.location.search);
const name = new URLSearchParams(window.location.search).get("name");
console.log("Booking for:", name);

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
  const startEl = parseInt(document.getElementById("startTime").value);
  const endEl = parseInt(document.getElementById("endTime").value);

  if(!startEl || !endEl)return 0;

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
}
console.log("Calculated cost is running");


function confirmBooking() {
  const date = document.getElementById("date").value;
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;

  const cost = calculateCurrentCost();

  if (!name || !date || !start || !end || cost <= 0) {
    alert("Please complete all fileds.");
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
        console.log("Expected array but got:", data);
        return;
      }
      container.innerHTML = "";

      data.forEach(booking => {
        console.log("Booking:", booking);

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${booking.babysitterName || "Unknown Babysitter"}</h3>
          <p>Date: ${booking.date}</p>
          <p>Time: ${booking.startTime} - ${booking.endTime}</p>
          <p>Total: $${booking.totalCost ?? 0}</p>

          <button onclick ="cancelBooking(${booking.id})" class ="delete-btn"> Cancel</button>
           <p>Status:</strong> ${booking.status || "Pending"}</p>

           <button onclick="payNow(${booking.id})"
          ${booking.status === "PAID" ? "disabled" : ""}>
           ${booking.status === "PAID" ? "Paid" : "Pay Now"}
           </button>
          <p style="color: ${booking.status == "CANCELLED" ? "red" : "green"};>
          ${booking.status}
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

window.onload = function () {
  loadBabysitters();
  loadProfile();
  loadBookingPageName();
  loadBookings();
  loadParentName();
};