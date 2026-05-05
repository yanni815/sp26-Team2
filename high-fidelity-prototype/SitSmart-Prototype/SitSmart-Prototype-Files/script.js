console.log("Script is running");

const API_BASE = "http://localhost:8080";

let selectedBabysitterRate = 18;

async function fetchAllBabysitters() {
  const response = await fetch(`${API_BASE}/babysitters`);
  if (!response.ok) {
    throw new Error("Failed to load babysitters");
  }
  return response.json();
}

async function fetchAllBookings() {
  const response = await fetch(`${API_BASE}/bookings`);
  if (!response.ok) {
    throw new Error("Failed to load bookings");
  }
  return response.json();
}

async function fetchAllParents() {
  const response = await fetch(`${API_BASE}/parents`);
  if (!response.ok) {
    throw new Error("Failed to load parents");
  }
  return response.json();
}

function setMessage(elementId, message, isError = false) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? "crimson" : "green";
}

async function signup(event) {
  if (event) event.preventDefault();

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const phoneEl = document.getElementById("phone");
  const addressEl = document.getElementById("address");
  const childrenEl = document.getElementById("children");

  if (!nameEl || !emailEl || !passwordEl || !phoneEl || !addressEl || !childrenEl) {
    alert("Missing signup fields.");
    return;
  }

  const name = nameEl.value.trim();
  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();
  const phoneNumber = phoneEl.value.trim();
  const address = addressEl.value.trim();
  const numberOfChildren = Number(childrenEl.value);

  if (!name || !email || !password || !phoneNumber || !address || !numberOfChildren) {
    alert("Please fill out every field.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/parents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phoneNumber,
        address,
        numberOfChildren
      })
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const created = await response.json();

    localStorage.setItem("userId", String(created.id));
    localStorage.setItem("parentName", created.name || "");

    window.location.href = "dashboard.html";
  } catch (err) {
    console.error("Signup error:", err);
    alert("Could not create parent account.");
  }
}

async function login(event) {
  if (event) event.preventDefault();

  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");

  if (!emailEl || !passwordEl) {
    alert("Missing login fields.");
    return;
  }

  const email = emailEl.value.trim();
  const password = passwordEl.value.trim();

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  try {
    const parents = await fetchAllParents();

    const parent = parents.find(p =>
      String(p.email || "").trim().toLowerCase() === email.toLowerCase() &&
      String(p.password || "").trim() === password
    );

    if (!parent) {
      alert("Invalid login");
      return;
    }

    localStorage.setItem("userId", String(parent.id));
    localStorage.setItem("parentName", parent.name || "");

    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
}

function loadParentName() {
  const el = document.getElementById("userName");
  if (!el) return;

  const userId = localStorage.getItem("userId");

  if (!userId || userId === "null" || userId === "undefined") {
    el.textContent = "Welcome Parent";
    return;
  }

  fetch(`${API_BASE}/parents/${userId}`)
    .then(async response => {
      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }
      return response.json();
    })
    .then(user => {
      el.textContent = `Welcome ${user.name || "Parent"}`;
    })
    .catch(err => {
      console.error(err);
      el.textContent = "Welcome Parent";
    });
}

function loadBabysitters() {
  const container = document.getElementById("babysitterContainer");
  if (!container) return;

  fetch(`${API_BASE}/babysitters`)
    .then(res => res.json())
    .then(data => {
      container.innerHTML = "";

      data.forEach(sitter => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${sitter.name || "Babysitter"} ⭐ ${sitter.rating ?? 0}</h3>
          <p>${sitter.hourlyRate ?? 0}/hr</p>
          <p>Verified: ${sitter.verifiedStatus ? "Yes ✅" : "No ❌"}</p>
          <a href="profile.html?name=${encodeURIComponent(sitter.name || "")}">
            <button>View Profile</button>
          </a>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => console.error("Load babysitters error:", err));
}

function loadProfile() {
  if (!document.getElementById("name")) return;

  const params = new URLSearchParams(window.location.search);
  const nameFromUrl = params.get("name");

  if (!nameFromUrl) return;

  fetch(`${API_BASE}/babysitters`)
    .then(res => res.json())
    .then(data => {
      const sitter = data.find(s => String(s.name || "") === nameFromUrl);

      if (!sitter) {
        console.error("Sitter not found");
        return;
      }

      const nameEl = document.getElementById("name");
      const ratingEl = document.getElementById("rating");
      const rateEl = document.getElementById("rate");
      const verifiedEl = document.getElementById("verified");
      const messageLink = document.getElementById("messageLink");
      const bookLink = document.getElementById("bookLink");

      if (nameEl) nameEl.innerText = sitter.name || "";
      if (ratingEl) ratingEl.innerText = `Rating: ⭐ ${sitter.rating ?? 0}`;
      if (rateEl) rateEl.innerText = `$${sitter.hourlyRate ?? 0}/hr`;
      if (verifiedEl) verifiedEl.innerText = sitter.verifiedStatus ? "✔ Verified" : "⚠ Not Verified";

      if (messageLink) {
        messageLink.href = `messages.html?name=${encodeURIComponent(sitter.name || "")}`;
      }

      if (bookLink) {
        bookLink.href = `booking.html?name=${encodeURIComponent(sitter.name || "")}`;
      }
    })
    .catch(err => console.error("Load profile error:", err));
}

function loadBookingPageName() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const title = document.getElementById("babysitterName");
  if (!title) return;

  if (!name) return;

  title.innerText = `Book ${name}`;

  fetch(`${API_BASE}/babysitters`)
    .then(res => res.json())
    .then(data => {
      const sitter = data.find(s => String(s.name || "") === name);
      if (sitter && typeof sitter.hourlyRate === "number") {
        selectedBabysitterRate = sitter.hourlyRate;
      } else {
        selectedBabysitterRate = 18;
      }
      calculateCost();
    })
    .catch(() => {
      selectedBabysitterRate = 18;
      calculateCost();
    });
}

function calculateCurrentCost() {
  const startEl = document.getElementById("startTime");
  const endEl = document.getElementById("endTime");

  if (!startEl || !endEl) return 0;

  const start = parseInt(startEl.value, 10);
  const end = parseInt(endEl.value, 10);

  if (Number.isNaN(start) || Number.isNaN(end)) return 0;

  const hours = end - start;
  if (hours <= 0) return 0;

  return hours * selectedBabysitterRate;
}

function calculateCost() {
  const costEl = document.getElementById("cost");
  if (!costEl) return;
  costEl.innerText = calculateCurrentCost();
}

function confirmBooking() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const dateEl = document.getElementById("date");
  const startEl = document.getElementById("startTime");
  const endEl = document.getElementById("endTime");
  const messageEl = document.getElementById("message");

  const date = dateEl ? dateEl.value : "";
  const start = startEl ? startEl.value : "";
  const end = endEl ? endEl.value : "";
  const cost = calculateCurrentCost();
  const parentId = localStorage.getItem("userId");

  if (!name || !date || !start || !end || cost <= 0) {
    alert("Please complete all fields.");
    return;
  }

  fetch(`${API_BASE}/babysitters`)
    .then(res => res.json())
    .then(babysitters => {
      const sitter = babysitters.find(s => String(s.name || "") === name);

      if (!sitter) {
        alert("Babysitter not found.");
        return null;
      }

      const booking = {
        date,
        startTime: start,
        endTime: end,
        totalCost: cost,
        status: "CREATED",
        parent: { id: Number(parentId) },
        babysitter: { id: sitter.id }
      };

      return fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
      });
    })
    .then(response => {
      if (!response) return;
      if (!response.ok) {
        throw new Error("Booking failed");
      }
      if (messageEl) {
        messageEl.innerText = "Booking confirmed!";
      }
      window.location.href = "bookings.html";
    })
    .catch(err => {
      console.error(err);
      alert("Could not save booking.");
    });
}

function loadBookings() {
  const container = document.getElementById("bookingsContainer");
  if (!container) return;

  const parentId = Number(localStorage.getItem("userId"));

  fetch(`${API_BASE}/bookings`)
    .then(res => res.json())
    .then(data => {
      if (!Array.isArray(data)) {
        container.innerHTML = "<p>No bookings found.</p>";
        return;
      }

      container.innerHTML = "";

      const filtered = data.filter(booking =>
        Number(booking.parent?.id) === parentId && booking.status !== "CANCELLED"
      );

      if (filtered.length === 0) {
        container.innerHTML = "<p>You do not have any bookings yet.</p>";
        return;
      }

      filtered.forEach(booking => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${booking.babysitter?.name || "Babysitter"}</h3>
          <p>Date: ${booking.date || ""}</p>
          <p>Time: ${booking.startTime || ""} - ${booking.endTime || ""}</p>
          <p>Total: $${booking.totalCost ?? 0}</p>
          <p>Status: ${booking.status || "Pending"}</p>
          <button onclick="payNow(${booking.id})" ${booking.status === "PAID" ? "disabled" : ""}>
            ${booking.status === "PAID" ? "Paid" : "Pay Now"}
          </button>
          <button onclick="cancelBooking(${booking.id})" class="delete-btn">Cancel</button>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => console.error(err));
}

function cancelBooking(id) {
  if (!confirm("Cancel this booking?")) return;

  fetch(`${API_BASE}/bookings/${id}`, {
    method: "DELETE"
  })
    .then(() => loadBookings())
    .catch(err => console.error("Delete error:", err));
}

function payNow(id) {
  fetch(`${API_BASE}/bookings/${id}`)
    .then(res => res.json())
    .then(booking => {
      return fetch(`${API_BASE}/bookings/${id}`, {
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
    .then(() => loadBookings())
    .catch(err => {
      console.error("Payment error:", err);
    });
}

function loadReviews() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const container = document.getElementById("reviewsContainer");
  if (!container) return;

  const reviews = JSON.parse(localStorage.getItem(name)) || [];

  container.innerHTML = "";

  if (reviews.length === 0) {
    container.innerHTML = "<p>No reviews yet.</p>";
    return;
  }

  reviews.forEach(r => {
    const p = document.createElement("p");
    p.innerText = "⭐ " + r;
    container.appendChild(p);
  });
}

function addReview() {
  alert("Babysitter profiles are read-only for reviews.");
}

function loadMessages() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const chatBox = document.getElementById("chatBox");
  if (!chatBox) return;

  const messages = JSON.parse(localStorage.getItem("chat_" + name)) || [];

  chatBox.innerHTML = "";

  if (messages.length === 0) {
    chatBox.innerHTML = "<p>No messages yet.</p>";
    return;
  }

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
  if (!input) return;

  const msg = input.value.trim();
  if (!msg) return;

  let messages = JSON.parse(localStorage.getItem("chat_" + name)) || [];
  messages.push("You: " + msg);

  localStorage.setItem("chat_" + name, JSON.stringify(messages));

  input.value = "";
  loadMessages();
}

window.onload = function () {
  loadBabysitters();
  loadProfile();
  loadBookingPageName();
  loadBookings();
  loadParentName();
  loadReviews();
  loadMessages();
};

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) signupForm.addEventListener("submit", signup);

  const loginForm = document.getElementById("loginForm");
  if (loginForm) loginForm.addEventListener("submit", login);
});