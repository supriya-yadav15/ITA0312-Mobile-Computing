```javascript
let users = {};

function register() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    if (username === "" || password === "") {
        message.textContent = "Please enter username and password.";
        return;
    }

    if (users[username]) {
        message.textContent = "Username already exists!";
        return;
    }

    users[username] = password;
    message.textContent = "Registration successful! Now login.";
}

function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    if (users[username] && users[username] === password) {
        document.getElementById("loginSection").classList.add("hidden");
        document.getElementById("appSection").classList.remove("hidden");
    } else {
        message.textContent = "Invalid details. Please register first.";
    }
}

function logout() {
    document.getElementById("appSection").classList.add("hidden");
    document.getElementById("loginSection").classList.remove("hidden");
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("message").textContent = "";
}
```