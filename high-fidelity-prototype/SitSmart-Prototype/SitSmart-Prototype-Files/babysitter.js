const API_BASE = "http://localhost:8080";

function getBabysitterId() {
  const raw = localStorage.getItem("babysitterId");
  return raw ? Number(raw) : null;
}

function getBabysitterName() {
  return localStorage.getItem("babysitterName") || "";
}

function formatDateOnly(value) {
  if (!value) return "";
  const text = String(value);
  return text.includes("T") ? text.split("T")[0] : text;
}

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

function redirectToLoginIfNeeded() {
  const babysitterId = getBabysitterId();
  if (!babysitterId) {
    window.location.href = "babysitter-login.html";
    return false;
  }
  return true;
}

async function createBabysitter(event) {
  if (event) event.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const phoneNumber = document.getElementById("signupPhone").value.trim();
  const hourlyRate = Number(document.getElementById("signupRate").value);

  if (!name || !email || !password || !phoneNumber || !hourlyRate) {
    setMessage("signupMessage", "Please fill out every field.", true);
    return;
  }

  const babysitter = {
    name,
    email,
    password,
    phoneNumber,
    hourlyRate,
    rating: 0,
    verifiedStatus: false,
    bio: "",
    availability: ""
  };

  try {
    const response = await fetch(`${API_BASE}/babysitters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(babysitter)
    });

    if (!response.ok) {
      throw new Error("Babysitter sign-up failed");
    }

    const created = await response.json();

    localStorage.setItem("babysitterId", created.id);
    localStorage.setItem("babysitterName", created.name);
    localStorage.setItem("babysitterEmail", created.email);

    window.location.href = "babysitter-dashboard.html";
  } catch (error) {
    console.error(error);
    setMessage("signupMessage", "Could not create babysitter account.", true);
  }
}

async function loginBabysitter(event) {
  if (event) event.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    setMessage("loginMessage", "Enter your email and password.", true);
    return;
  }

  try {
    const babysitters = await fetchAllBabysitters();
    const babysitter = babysitters.find(
      s => String(s.email || "").toLowerCase() === email.toLowerCase() && String(s.password || "") === password
    );

    if (!babysitter) {
      setMessage("loginMessage", "Invalid email or password.", true);
      return;
    }

    localStorage.setItem("babysitterId", babysitter.id);
    localStorage.setItem("babysitterName", babysitter.name);
    localStorage.setItem("babysitterEmail", babysitter.email);

    window.location.href = "babysitter-dashboard.html";
  } catch (error) {
    console.error(error);
    setMessage("loginMessage", "Login failed. Check your backend connection.", true);
  }
}

async function loadBabysitterDashboard() {
  if (!redirectToLoginIfNeeded()) return;

  const name = getBabysitterName();
  const welcome = document.getElementById("welcome");
  if (welcome) {
    welcome.textContent = `Welcome, ${name || "Babysitter"}!`;
  }

  const babysitterId = getBabysitterId();
  const container = document.getElementById("upcomingJobsContainer");
  if (!container) return;

  try {
    const bookings = await fetchAllBookings();

    const myBookings = bookings
      .filter(booking => Number(booking.babysitter?.id) === getBabysitterId())
      .sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));

    container.innerHTML = "";

    if (myBookings.length === 0) {
      container.innerHTML = "<p>No upcoming bookings yet.</p>";
      return;
    }

    myBookings.slice(0, 5).forEach(booking => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>Booking</h3>
        <p><strong>Parent:</strong> ${booking.parent?.name || `Parent #${booking.parent?.id || "N/A"}`}</p>
        <p><strong>Date:</strong> ${formatDateOnly(booking.date) || "N/A"}</p>
        <p><strong>Time:</strong> ${booking.startTime || "N/A"} - ${booking.endTime || "N/A"}</p>
        <p><strong>Total:</strong> $${booking.totalCost ?? 0}</p>
        <p><strong>Status:</strong> ${booking.status || "UNKNOWN"}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Could not load bookings.</p>";
  }
}

async function loadBabysitterProfile() {
  if (!redirectToLoginIfNeeded()) return;

  try {
    const babysitterId = getBabysitterId();
    const babysitters = await fetchAllBabysitters();
    const sitter = babysitters.find(b => Number(b.id) === babysitterId);

    if (!sitter) {
      setMessage("profileMessage", "Babysitter profile not found.", true);
      return;
    }

    const nameInput = document.getElementById("profileName");
    const emailInput = document.getElementById("profileEmail");
    const phoneInput = document.getElementById("profilePhone");
    const passwordInput = document.getElementById("profilePassword");
    const rateInput = document.getElementById("profileRate");
    const ratingInput = document.getElementById("profileRating");
    const verifiedInput = document.getElementById("profileVerified");
    const bioInput = document.getElementById("profileBio");
    const availabilityInput = document.getElementById("profileAvailability");

    if (nameInput) nameInput.value = sitter.name || "";
    if (emailInput) emailInput.value = sitter.email || "";
    if (phoneInput) phoneInput.value = sitter.phoneNumber || "";
    if (passwordInput) passwordInput.value = sitter.password || "";
    if (rateInput) rateInput.value = sitter.hourlyRate ?? "";
    if (ratingInput) ratingInput.value = sitter.rating ?? 0;
    if (verifiedInput) verifiedInput.value = sitter.verifiedStatus ? "Yes" : "No";
    if (bioInput) bioInput.value = sitter.bio || "";
    if (availabilityInput) availabilityInput.value = sitter.availability || "";
  } catch (error) {
    console.error(error);
    setMessage("profileMessage", "Could not load your profile.", true);
  }
}

async function saveBabysitterProfile(event) {
  if (event) event.preventDefault();

  const babysitterId = getBabysitterId();
  if (!babysitterId) {
    window.location.href = "babysitter-login.html";
    return;
  }

  const updatedBabysitter = {
    id: babysitterId,
    name: document.getElementById("profileName").value.trim(),
    email: document.getElementById("profileEmail").value.trim(),
    password: document.getElementById("profilePassword").value.trim(),
    phoneNumber: document.getElementById("profilePhone").value.trim(),
    hourlyRate: Number(document.getElementById("profileRate").value),
    rating: Number(document.getElementById("profileRating").value || 0),
    verifiedStatus: document.getElementById("profileVerified").value === "Yes",
    bio: document.getElementById("profileBio").value.trim(),
    availability: document.getElementById("profileAvailability").value.trim()
  };

  try {
    const response = await fetch(`${API_BASE}/babysitters/${babysitterId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedBabysitter)
    });

    if (!response.ok) {
      throw new Error("Profile update failed");
    }

    const saved = await response.json();
    localStorage.setItem("babysitterName", saved.name);
    localStorage.setItem("babysitterEmail", saved.email);

    setMessage("profileMessage", "Profile updated successfully.");
  } catch (error) {
    console.error(error);
    setMessage("profileMessage", "Save failed. Check the backend PUT /babysitters/{id}.", true);
  }
}

async function loadBabysitterBookings() {
  if (!redirectToLoginIfNeeded()) return;

  const container = document.getElementById("bookingsContainer");
  if (!container) return;

  try {
    const bookings = await fetchAllBookings();
    const babysitterId = getBabysitterId();

    const myBookings = bookings.filter(
      booking => Number(booking.babysitter?.id) === babysitterId
    );

    container.innerHTML = "";

    if (myBookings.length === 0) {
      container.innerHTML = "<p>No jobs assigned yet.</p>";
      return;
    }

    myBookings.forEach(booking => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>Booking</h3>
        <p><strong>Parent:</strong> ${booking.parent?.name || `Parent #${booking.parent?.id || "N/A"}`}</p>
        <p><strong>Date:</strong> ${formatDateOnly(booking.date) || "N/A"}</p>
        <p><strong>Time:</strong> ${booking.startTime || "N/A"} - ${booking.endTime || "N/A"}</p>
        <p><strong>Total:</strong> $${booking.totalCost ?? 0}</p>
        <p><strong>Status:</strong> ${booking.status || "UNKNOWN"}</p>
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
          <button class="green-btn" onclick="acceptBooking(${booking.id})">Accept</button>
          <button class="delete-btn" onclick="declineBooking(${booking.id})">Decline</button>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Could not load your jobs.</p>";
  }
}

async function acceptBooking(id) {
  try {
    const response = await fetch(`${API_BASE}/bookings/${id}/accept`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error("Accept failed");
    }

    await loadBabysitterBookings();
    await loadBabysitterDashboard();
  } catch (error) {
    console.error(error);
    alert("Could not accept booking.");
  }
}

async function declineBooking(id) {
  try {
    const response = await fetch(`${API_BASE}/bookings/${id}/decline`, {
      method: "PUT"
    });

    if (!response.ok) {
      throw new Error("Decline failed");
    }

    await loadBabysitterBookings();
    await loadBabysitterDashboard();
  } catch (error) {
    console.error(error);
    alert("Could not decline booking.");
  }
}

async function loadReviews() {
  const container = document.getElementById("reviewsContainer");
  if (!container) return;

  const babysitterId = getBabysitterId();

  try {
    const response = await fetch(`${API_BASE}/reviews`);
    const data = await response.json();

    container.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
      container.innerHTML = "<p>No reviews yet.</p>";
      return;
    }

    const myReviews = data.filter(review => Number(review.babysitter?.id) === babysitterId);

    if (myReviews.length === 0) {
      container.innerHTML = "<p>No reviews for your profile yet.</p>";
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
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Could not load reviews.</p>";
  }
}

async function loadParentDropdown() {
  const select = document.getElementById("parentSelect");
  if (!select) return;

  try {
    const parents = await fetchAllParents();

    select.innerHTML = `<option value="">Select a parent</option>`;

    if (!Array.isArray(parents) || parents.length === 0) {
      select.innerHTML = `<option value="">No parents available yet</option>`;
      return;
    }

    parents.forEach(parent => {
      const option = document.createElement("option");
      option.value = parent.id;
      option.textContent = parent.name || `Parent ${parent.id}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    select.innerHTML = `<option value="">Could not load parents</option>`;
  }
}

async function loadConversation() {
  const container = document.getElementById("chatMessages");
  const parentId = document.getElementById("parentSelect")?.value;
  const babysitterId = getBabysitterId();

  if (!container) return;

  if (!parentId) {
    container.innerHTML = "<p>Select a parent to view the conversation.</p>";
    return;
  }

  if (!babysitterId) return;

  try {
    const response = await fetch(`${API_BASE}/messages`);
    const messages = await response.json();

    const selectedParentId = Number(parentId);

    const conversation = messages.filter(message => {
      const senderId = Number(message.sender?.id);
      const receiverId = Number(message.receiver?.id);

      return (
        (senderId === babysitterId && receiverId === selectedParentId) ||
        (senderId === selectedParentId && receiverId === babysitterId)
      );
    });

    container.innerHTML = "";

    if (conversation.length === 0) {
      container.innerHTML = "<p>No messages yet.</p>";
      return;
    }

    conversation.forEach(message => {
      const bubble = document.createElement("div");
      bubble.className = "chat-box";

      const fromMe = message.sender?.id === babysitterId;
      const senderName = fromMe 
      ? "You" 
      : (message.sender?.name || "Parent");

      bubble.innerHTML = `
        <p><strong>${fromMe ? "You" : (message.sender?.name || "Parent")}:</strong> ${message.content || ""}</p>
        <p><small>${formatDateOnly(message.timestamp)}</small></p>
      `;

      container.appendChild(bubble);
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Could not load conversation.</p>";
  }
}

async function sendBabysitterMessage() {
  const babysitterId = getBabysitterId();
  const parentId = document.getElementById("parentSelect")?.value;
  const input = document.getElementById("messageInput");

  if (!babysitterId || !parentId || !input) {
    alert("Select a parent and type a message.");
    return;
  }

  const content = input.value.trim();
  if (!content) {
    alert("Type a message first.");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/messages/send/${babysitterId}/${parentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content,
        timestamp: new Date().toISOString().split("T")[0]
      })
    });

    if (!response.ok) {
      throw new Error("Message send failed");
    }

    input.value = "";
    await loadConversation();
  } catch (error) {
    console.error(error);
    alert("Could not send message.");
  }
}

async function deleteBabysitterProfile() {
  const babysitterId = getBabysitterId();
  if (!babysitterId) {
    window.location.href = "babysitter-login.html";
    return;
  }

  const confirmed = confirm("Delete your babysitter profile permanently?");
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_BASE}/babysitters/${babysitterId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    localStorage.removeItem("babysitterId");
    localStorage.removeItem("babysitterName");
    localStorage.removeItem("babysitterEmail");

    window.location.href = "babysitter-sign-up.html";
  } catch (error) {
    console.error(error);
    alert("Could not delete profile.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("babysitterSignupForm");
  if (signupForm) signupForm.addEventListener("submit", createBabysitter);

  const loginForm = document.getElementById("babysitterLoginForm");
  if (loginForm) loginForm.addEventListener("submit", loginBabysitter);

  const profileForm = document.getElementById("babysitterProfileForm");
  if (profileForm) profileForm.addEventListener("submit", saveBabysitterProfile);

  if (document.getElementById("welcome")) {
    loadBabysitterDashboard();
  }

  if (document.getElementById("profileName")) {
    loadBabysitterProfile();
  }

  if (document.getElementById("bookingsContainer")) {
    loadBabysitterBookings();
  }

  if (document.getElementById("reviewsContainer")) {
    loadReviews();
  }

  if (document.getElementById("parentSelect")) {
    loadParentDropdown();

    const parentSelect = document.getElementById("parentSelect");
    if (parentSelect) {
      parentSelect.addEventListener("change", loadConversation);
    }
  }

  if (document.getElementById("chatMessages")) {
    loadConversation();
  }
});
})