console.log("script is running");
fetch("http://localhost:8080/babysitters")
.then(res => res.json())
.then(data => {
    const container = document.getElementById("babysitterContainer");

    data.forEach(sitter => {
        const card = document.createElement("div");
        card.className = "card";
   

    card.innerHTML = `
    <img src= "${sitter.image}" class="profile-img">
    <h3>${sitter.name} ⭐ ${sitter.rating}</h3>
    <p>${sitter.hourlyRate}/hr</p>
    <p>Verified: ${sitter.verified ? "Yes ✅" : "No ❌"}</p>
    <a href="profile.html">
        <button>View Profile</button>
    </a>
    `;
    container.appendChild(card);

});

 });


 function bookBabysitter(){
    const date = document.getElementById("date").value;
    const time= document.getElementById("time").value;

    const params = new URLSearchParams(window.location.search);
    const babysitterName = params.get("name");

    const booking = {
        babysitterName: babysitterName,
        date: date,
        time: time
    };

    fetch("http://localhost:8080/bookings",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
    })
        .then(res => res.json())
        .then(() => {
            document.getElementById("message").innerText = 
                "Booking confirmed!";
        })
        .catch(() => {
            document.getElementById("message").innerText =
            "Error booking babysitter.";
        });
    
 }

 function loadProfile() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const nameEl = document.getElementById("name");
  if (!nameEl || !name) return;

  fetch("http://localhost:8080/api/babysitters")
    .then(res => res.json())
    .then(data => {
      const sitter = data.find(s => s.name === name);

      if (!sitter) return;

      document.getElementById("name").innerText = sitter.name;
      document.getElementById("rating").innerText = "Rating: ⭐ " + sitter.rating;
      document.getElementById("rate").innerText = "$" + sitter.rate + "/hr";
      document.getElementById("bio").innerText = sitter.bio;
      document.getElementById("verified").innerText =
        sitter.verified ? "✔ Verified" : "⚠ Not Verified";

      document.getElementById("profileImg").src = sitter.image;

      document.getElementById("bookLink").href =
        "booking.html?name=" + encodeURIComponent(sitter.name);
    })
     .catch(err => console.error("Error loading profile:", err));
}

function loadBookingPageName() {
  const title = document.getElementById("babysitterName");
  if (!title) return;

  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  if (name) {
    title.innerText = "Book " + name;
  }
}
 