```javascript
let users = JSON.parse(localStorage.getItem("parkingUsers") || "{}");
let currentUser = "";

let slots = [
    { id: "A1", booked: false, user: "", vehicle: "" },
    { id: "A2", booked: true, user: "sample", vehicle: "TN01AB1234" },
    { id: "A3", booked: false, user: "", vehicle: "" },
    { id: "B1", booked: false, user: "", vehicle: "" },
    { id: "B2", booked: true, user: "sample", vehicle: "TN02CD5678" },
    { id: "B3", booked: false, user: "", vehicle: "" }
];

function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    if (!username || !password) {
        message.textContent = "Enter username and password.";
        return;
    }

    if (users[username]) {
        message.textContent = "Username already exists. Please login.";
        return;
    }

    users[username] = password;
    localStorage.setItem("parkingUsers", JSON.stringify(users));

    currentUser = username;
    openDashboard();
    alert("Registration successful!");
}

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (users[username] && users[username] === password) {
        currentUser = username;
        openDashboard();
    } else {
        document.getElementById("message").textContent =
            "Invalid login. Please register first.";
    }
}

function openDashboard() {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("appSection").classList.remove("hidden");
    renderSlots();
}

function renderSlots() {
    const grid = document.getElementById("parkingGrid");
    const select = document.getElementById("slotSelect");

    grid.innerHTML = "";
    select.innerHTML =
        '<option value="">-- Select Available Slot --</option>';

    slots.forEach(slot => {
        const card = document.createElement("div");
        card.className = "slot " +
            (slot.booked ? "booked" : "available");

        card.textContent = slot.id + " - " +
            (slot.booked ? "Booked" : "Available");

        grid.appendChild(card);

        if (!slot.booked) {
            const option = document.createElement("option");
            option.value = slot.id;
            option.textContent = slot.id;
            select.appendChild(option);
        }
    });

    document.getElementById("totalCount").textContent = slots.length;
    document.getElementById("emptyCount").textContent =
        slots.filter(slot => !slot.booked).length;
    document.getElementById("bookedCount").textContent =
        slots.filter(slot => slot.booked).length;

    showMyBooking();
}

function bookSlot() {
    const selectedId = document.getElementById("slotSelect").value;
    const vehicle = document.getElementById("vehicleNumber")
        .value.trim().toUpperCase();
    const message = document.getElementById("bookingMessage");

    if (!selectedId || !vehicle) {
        message.textContent =
            "Please select a slot and enter your vehicle number.";
        return;
    }

    const slot = slots.find(item => item.id === selectedId);

    if (!slot || slot.booked) {
        message.textContent =
            "Sorry, this slot is no longer available.";
        renderSlots();
        return;
    }

    slot.booked = true;
    slot.user = currentUser;
    slot.vehicle = vehicle;

    message.textContent =
        "Success! Parking slot " + slot.id + " is booked.";

    document.getElementById("vehicleNumber").value = "";
    renderSlots();
}

function showMyBooking() {
    const area = document.getElementById("myBooking");
    const booking = slots.find(
        slot => slot.booked && slot.user === currentUser
    );

    area.textContent = booking
        ? "Slot: " + booking.id + " | Vehicle: " + booking.vehicle
        : "You have no active booking.";
}

function logout() {
    currentUser = "";
    document.getElementById("appSection").classList.add("hidden");
    document.getElementById("loginSection").classList.remove("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("message").textContent = "";
    document.getElementById("bookingMessage").textContent = "";
}
```