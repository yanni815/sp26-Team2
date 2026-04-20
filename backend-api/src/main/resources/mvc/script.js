console.log("script is running");

window.onload = function () {
  loadBabysitters();
  loadProfile();
  loadBookingPageName();
  loadBookings();
};

function loadBabysitters(){
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
    <a href="profile.html?name=${encodeURIComponent(sitter.name)}">
        <button>View Profile</button>
    </a>
    `;
    container.appendChild(card);

});

 });

}
 function bookBabysitter(){
    const date = document.getElementById("date").value;
    const start= document.getElementById("startTime").value;
    const end= document.getElementById("endTime").value;
    console.log("Time selected:", time);

    const params = new URLSearchParams(window.location.search);
    const babysitterName = params.get("name");

    if(!start || !end){
        alert("Please select a time");
        return;
    }
    const booking = {
        babysitterName: babysitterName,
        date: date,
        startTime: start,
        endTime: end
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

  console.log("URL name:", name);

  if (!name) return;

  fetch("http://localhost:8080/babysitters")
    .then(res => res.json())
    .then(data => {
      const sitter = data.find(s => s.name.toLowerCase() === name.toLowerCase());

      console.log("Found sitter:", sitter);

      if (!sitter) return;

      document.getElementById("name").innerText = sitter.name;
      document.getElementById("rating").innerText = "Rating: ⭐ " + sitter.rating;
      document.getElementById("rate").innerText = "$" + sitter.hourlyRate + "/hr";
      document.getElementById("bio").innerText = sitter.bio;
      document.getElementById("verified").innerText =
        sitter.verified ? "✔ Verified" : "⚠ Not Verified";

      document.getElementById("profileImg").src = sitter.image;

      document.getElementById("bookLink").href =
        "booking.html?name=" + encodeURIComponent(sitter.name);
    })
     .catch(err => console.log("ERROR:", err));
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

  let currentSitter = null;

function loadBookingPageData() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  fetch("http://localhost:8080/babysitters")
    .then(res => res.json())
    .then(data => {
      currentSitter = data.find(s =>
        s.name.toLowerCase() === name.toLowerCase()
      );

      console.log("Loaded sitter:", currentSitter);
    });
}

  function confirmBooking() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  const date = document.getElementById("date").value;
  const start = document.getElementById("startTime").value;
  const end = document.getElementById("endTime").value;
  const price = document.getElementById("price").innerText;

  const booking = {
    babysitterName: name,
    date: date,
    startTime: start,
    endTime: end,
    totalPrice: price
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
  });
}

 function calculatePrice(){
    const start = parseInt(document.getElementById("startTime").value);
    const end = parseInt(document.getElementById("endTime").value);

    if(!start || !end) return;

    const hours = end - start;

    if(hours <= 0){
        document.getElementById("price").innerText = "0";
        return;
    }

    const rate = 18;
    const total = hours * rate;

    document.getElementById("price").innerText = total;
  }

 function loadBookings() {
  const container = document.getElementById("bookingsContainer");

  fetch("http://localhost:8080/bookings")
    .then(res => res.json())
    .then(data => {

      container.innerHTML = "";

      data.forEach(booking => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
          <h3>${booking.babysitterName}</h3>
          <p>Date: ${booking.date}</p>
          <p>Time: ${booking.startTime} - ${booking.endTime}</p>
          <p>Total: $${booking.totalPrice}</p>
        `;

        container.appendChild(card);
      });
    });
}
