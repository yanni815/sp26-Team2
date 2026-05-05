const API_BASE = "http://localhost:8080";

let selectedBabysitter = null;
let selectedBabysitterRate = 18;

function getParentId() {
  const raw = localStorage.getItem("userId");
  return raw ? Number(raw) : null;
}

function getParentName() {
  return localStorage.getItem("parentName") || "";
}

function formatDateOnly(value) {
  if (!value) return "";
  const text = String(value);
  return text.includes("T") ? text.split("T")[0] : text;
}

async function fetchAllBabysitters() {
  const response = await fetch(`${API_BASE}/babysitters`);
  if (!response.ok) throw new Error("Failed to load babysitters");
  return response.json();
}

async function fetchAllBookings() {
  const response = await fetch(`${API_BASE}/bookings`);
  if (!response.ok) throw new Error("Failed to load bookings");
  return response.json();
}

async function fetchMyBookings(parentId) {
  const response = await fetch(`${API_BASE}/bookings/parent/${parentId}`);
  if (!response.ok) throw new Error("Failed to load parent bookings");
  return response.json();
}

async function fetchAllParents() {
  const response = await fetch(`${API_BASE}/parents`);
  if (!response.ok) throw new Error("Failed to load parents");
  return response.json();
}

async function fetchAllMessages() {
  const response = await fetch(`${API_BASE}/messages`);
  if (!response.ok) throw new Error("Failed to load messages");
  return response.json();
}

async function fetchAllReviews() {
  const response = await fetch(`${API_BASE}/reviews`);
  if (!response.ok) throw new Error("Failed to load reviews");
  return response.json();
}

function setMessage(elementId, message, isError = false) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? "crimson" : "green";
}

async function resolveSelectedBabysitter() {
  if (selectedBabysitter) return selectedBabysitter;

  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const id = params.get("id");

  const babysitters = await fetchAllBabysitters();

  if (id) {
    selectedBabysitter = babysitters.find(s => String(s.id) === String(id)) || null;
    return selectedBabysitter;
  }

  if (name) {
    selectedBabysitter = babysitters.find(s => String(s.name || "") === name) || null;
    return selectedBabysitter;
  }

  return null;
}

async function signup(event) {
  if (event) event.preventDefault();

  const name = document.getElementById("name")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();
  const phoneNumber = document.getElementById("phone")?.value.trim();
  const address = document.getElementById("address")?.value.trim();
  const numberOfChildren = Number(document.getElementById("children")?.value);

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

    if (!response.ok) throw new Error("Signup failed");

    const created = await response.json();
    localStorage.setItem("userId", String(created.id));
    localStorage.setItem("parentName", created.name || "");

    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Could not create parent account.");
  }
}

async function login(event) {
  if (event) event.preventDefault();

  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!email || !password) {
    alert("Enter email and password.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/parents/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const parent = await response.json();

    if (!response.ok || !parent || !parent.id) {
      alert("Invalid login.");
      return;
    }

    localStorage.setItem("userId", String(parent.id));
    localStorage.setItem("parentName", parent.name || "");

    window.location.href = "dashboard.html";
  } catch (err) {
    console.error(err);
    alert("Login failed.");
  }
}

async function loadParentName() {
  const el = document.getElementById("userName");
  if (!el) return;

  const userId = getParentId();
  if (!userId) {
    el.textContent = "Welcome Parent";
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/parents/${userId}`);
    if (!response.ok) throw new Error(`Backend error: ${response.status}`);

    const user = await response.json();
    el.textContent = `Welcome ${user.name || "Parent"}`;
  } catch (err) {
    console.error(err);
    el.textContent = "Welcome Parent";
  }
}

async function loadBabysitters() {
  const container = document.getElementById("babysitterContainer");
  if (!container) return;

  try {
    const data = await fetchAllBabysitters();
    container.innerHTML = "";

    data.forEach(sitter => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${sitter.name || "Babysitter"} ⭐ ${sitter.rating ?? 0}</h3>
        <p>${sitter.hourlyRate ?? 0}/hr</p>
        <p>Verified: ${sitter.verifiedStatus ? "Yes ✅" : "No ❌"}</p>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <a href="profile.html?name=${encodeURIComponent(sitter.name || "")}">
            <button>View Profile</button>
          </a>
          <a href="booking.html?name=${encodeURIComponent(sitter.name || "")}">
            <button class="green-btn">Book Now</button>
          </a>
          <a href="messages.html?name=${encodeURIComponent(sitter.name || "")}">
            <button>Message</button>
          </a>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Could not load babysitters.</p>";
  }
}

async function loadProfile() {
  const nameEl = document.getElementById("name");
  if (!nameEl) return;

  const sitter = await resolveSelectedBabysitter();
  if (!sitter) {
    nameEl.innerText = "Babysitter not found";
    return;
  }

  const ratingEl = document.getElementById("rating");
  const rateEl = document.getElementById("rate");
  const verifiedEl = document.getElementById("verified");
  const bioEl = document.getElementById("bio");
  const availabilityEl = document.getElementById("availability");
  const messageLink = document.getElementById("messageLink");
  const bookLink = document.getElementById("bookLink");

  nameEl.innerText = sitter.name || "";
  if (ratingEl) ratingEl.innerText = `Rating: ⭐ ${sitter.rating ?? 0}`;
  if (rateEl) rateEl.innerText = `$${sitter.hourlyRate ?? 0}/hr`;
  if (verifiedEl) verifiedEl.innerText = sitter.verifiedStatus ? "✔ Verified" : "⚠ Not Verified";
  if (bioEl) bioEl.innerText = sitter.bio || "";
  if (availabilityEl) availabilityEl.innerText = sitter.availability || "";

  if (messageLink) {
    messageLink.href = `messages.html?name=${encodeURIComponent(sitter.name || "")}`;
  }

  if (bookLink) {
    bookLink.href = `booking.html?name=${encodeURIComponent(sitter.name || "")}`;
  }
}

async function loadBookingPageName() {
  const title = document.getElementById("babysitterName");
  if (!title) return;

  const sitter = await resolveSelectedBabysitter();
  if (!sitter) return;

  selectedBabysitterRate = Number(sitter.hourlyRate) || 18;
  title.innerText = `Book ${sitter.name || "Babysitter"}`;

  const rateDisplay = document.getElementById("hourlyRateDisplay");
  if (rateDisplay) {
    rateDisplay.innerText = `$${selectedBabysitterRate}/hr`;
  }

  calculateCost();
}

function calculateCurrentCost() {
  const start = parseInt(document.getElementById("startTime")?.value, 10);
  const end = parseInt(document.getElementById("endTime")?.value, 10);

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

async function confirmBooking() {
  const sitter = await resolveSelectedBabysitter();
  if (!sitter) {
    alert("Babysitter not found.");
    return;
  }

  const date = document.getElementById("date")?.value;
  const start = document.getElementById("startTime")?.value;
  const end = document.getElementById("endTime")?.value;
  const cost = calculateCurrentCost();
  const parentId = getParentId();

  if (!parentId) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }

  if (!date || !start || !end || cost <= 0) {
    alert("Please complete all fields.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date,
        startTime: start,
        endTime: end,
        totalCost: cost,
        status: "CREATED",
        parent: { id: parentId },
        babysitter: { id: sitter.id }
      })
    });

    if (!response.ok) throw new Error("Booking failed");

    window.location.href = "bookings.html";
  } catch (err) {
    console.error(err);
    alert("Could not save booking.");
  }
}

async function loadBookings() {
  const container = document.getElementById("bookingsContainer");
  if (!container) return;

  const parentId = getParentId();
  if (!parentId) {
    container.innerHTML = "<p>Please log in to see your bookings.</p>";
    return;
  }

  try {
    const data = await fetchMyBookings(parentId);

    container.innerHTML = "";

    const filtered = Array.isArray(data)
      ? data.filter(b => b.status !== "CANCELLED")
      : [];

    if (filtered.length === 0) {
      container.innerHTML = "<p>You do not have any bookings yet.</p>";
      return;
    }

    filtered.forEach(booking => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${booking.babysitter?.name || "Babysitter"}</h3>
        <p>Date: ${formatDateOnly(booking.date)}</p>
        <p>Time: ${booking.startTime || ""} - ${booking.endTime || ""}</p>
        <p>Total: $${booking.totalCost ?? 0}</p>
        <p>Status: ${booking.status || "Pending"}</p>
        <button onclick="payNow(${booking.id})" ${booking.status === "PAID" ? "disabled" : ""}>
          ${booking.status === "PAID" ? "Paid" : "Mark as Paid"}
        </button>
        <button onclick="cancelBooking(${booking.id})" class="delete-btn">Cancel</button>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Could not load bookings.</p>";
  }
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
    .catch(err => console.error("Payment error:", err));
}

async function loadDashboardBooking() {
  const container = document.getElementById("upcomingBookingContainer");
  if (!container) return;

  const parentId = getParentId();
  if (!parentId) {
    container.innerHTML = "<p>No upcoming bookings.</p>";
    return;
  }

  try {
    const bookings = await fetchMyBookings(parentId);
    const active = Array.isArray(bookings)
      ? bookings.filter(b => b.status !== "CANCELLED")
      : [];

    if (active.length === 0) {
      container.innerHTML = "<p>No upcoming bookings.</p>";
      return;
    }

    const booking = active[0];

    container.innerHTML = `
      <p><strong>Babysitter:</strong> ${booking.babysitter?.name || "Babysitter"}</p>
      <p><strong>Date:</strong> ${formatDateOnly(booking.date)}</p>
      <p><strong>Time:</strong> ${booking.startTime || ""} - ${booking.endTime || ""}</p>
      <p><strong>Status:</strong> ${booking.status || "Pending"}</p>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>No upcoming bookings.</p>";
  }
}

async function loadReviews() {
  const container = document.getElementById("reviewsContainer");
  if (!container) return;

  const sitter = await resolveSelectedBabysitter();
  if (!sitter) {
    container.innerHTML = "<p>No reviews yet.</p>";
    return;
  }

  try {
    const data = await fetchAllReviews();
    const myReviews = Array.isArray(data)
      ? data.filter(review => Number(review.babysitter?.id) === Number(sitter.id))
      : [];

    container.innerHTML = "";

    if (myReviews.length === 0) {
      container.innerHTML = "<p>No reviews yet.</p>";
      return;
    }

    myReviews.forEach(review => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <p><strong>Rating:</strong> ⭐ ${review.rating ?? 0}</p>
        <p>${review.comment || ""}</p>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Could not load reviews.</p>";
  }
}

async function addReview(event) {
  if (event) event.preventDefault();

  const sitter = await resolveSelectedBabysitter();
  if (!sitter) {
    alert("Select a babysitter first.");
    return;
  }

  const parentId = getParentId();
  if (!parentId) {
    alert("Please log in first.");
    window.location.href = "login.html";
    return;
  }

  const comment = document.getElementById("reviewInput")?.value.trim();
  const rating = Number(document.getElementById("reviewRating")?.value || 5);

  if (!comment) {
    alert("Enter a review first.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        comment,
        rating,
        parent: { id: parentId },
        babysitter: { id: sitter.id }
      })
    });

    if (!response.ok) throw new Error("Review failed");

    document.getElementById("reviewInput").value = "";
    document.getElementById("reviewRating").value = "5";
    await loadReviews();
  } catch (err) {
    console.error(err);
    alert("Could not submit review.");
  }
}

async function loadBabysitterDropdown() {
  const select = document.getElementById("babysitterSelect");
  if (!select) return;

  try {
    const babysitters = await fetchAllBabysitters();
    select.innerHTML = `<option value="">Select a babysitter</option>`;

    babysitters.forEach(sitter => {
      const option = document.createElement("option");
      option.value = sitter.id;
      option.textContent = sitter.name || `Babysitter ${sitter.id}`;
      select.appendChild(option);
    });

    const sitter = await resolveSelectedBabysitter();
    if (sitter) {
      select.value = String(sitter.id);
      const chatName = document.getElementById("chatName");
      if (chatName) chatName.textContent = `Message ${sitter.name || "Babysitter"}`;
    }
  } catch (err) {
    console.error(err);
    select.innerHTML = `<option value="">Could not load babysitters</option>`;
  }
}

async function loadConversation() {
  const chatBox = document.getElementById("chatBox");
  const select = document.getElementById("babysitterSelect");
  const parentId = getParentId();

  if (!chatBox || !select || !parentId) return;

  const babysitterId = Number(select.value);
  if (!babysitterId) {
    chatBox.innerHTML = "<p>Select a babysitter to view the conversation.</p>";
    return;
  }

  try {
    const messages = await fetchAllMessages();

    const conversation = Array.isArray(messages)
      ? messages.filter(message => {
          const senderId = Number(message.sender?.id);
          const receiverId = Number(message.receiver?.id);

          return (
            (senderId === parentId && receiverId === babysitterId) ||
            (senderId === babysitterId && receiverId === parentId)
          );
        })
      : [];

    chatBox.innerHTML = "";

    if (conversation.length === 0) {
      chatBox.innerHTML = "<p>No messages yet.</p>";
      return;
    }

    conversation.forEach(message => {
      const p = document.createElement("div");
      p.className = "chat-box";

      const fromMe = Number(message.sender?.id) === parentId;
      p.innerHTML = `
        <p><strong>${fromMe ? "You" : (message.sender?.name || "Babysitter")}:</strong> ${message.content || ""}</p>
        <p><small>${formatDateOnly(message.timestamp)}</small></p>
      `;

      chatBox.appendChild(p);
    });
  } catch (err) {
    console.error(err);
    chatBox.innerHTML = "<p>Could not load conversation.</p>";
  }
}

async function sendMessage() {
  const parentId = getParentId();
  const babysitterId = Number(document.getElementById("babysitterSelect")?.value);
  const input = document.getElementById("messageInput");

  if (!parentId || !babysitterId || !input) {
    alert("Select a babysitter and type a message.");
    return;
  }

  const content = input.value.trim();
  if (!content) {
    alert("Type a message first.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/messages/send/${parentId}/${babysitterId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content,
        timestamp: new Date().toISOString().split("T")[0]
      })
    });

    if (!response.ok) throw new Error("Message send failed");

    input.value = "";
    await loadConversation();
  } catch (err) {
    console.error(err);
    alert("Could not send message.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) signupForm.addEventListener("submit", signup);

  const loginForm = document.getElementById("loginForm");
  if (loginForm) loginForm.addEventListener("submit", login);

  if (document.getElementById("userName")) {
    loadParentName();
  }

  if (document.getElementById("babysitterContainer")) {
    loadBabysitters();
  }

  if (document.getElementById("upcomingBookingContainer")) {
    loadDashboardBooking();
  }

  if (document.getElementById("name")) {
    loadProfile();
  }

  if (document.getElementById("babysitterName")) {
    loadBookingPageName();
  }

  if (document.getElementById("bookingsContainer")) {
    loadBookings();
  }

  if (document.getElementById("reviewsContainer")) {
    loadReviews();
  }

  if (document.getElementById("babysitterSelect")) {
    loadBabysitterDropdown();

    const select = document.getElementById("babysitterSelect");
    select.addEventListener("change", async () => {
      selectedBabysitter = null;
      await resolveSelectedBabysitter();
      await loadConversation();
      await loadReviews();
    });
  }

  if (document.getElementById("chatBox")) {
    loadConversation();
  }

  const reviewForm = document.getElementById("reviewForm");
  if (reviewForm) {
    reviewForm.addEventListener("submit", addReview);
  }
});
