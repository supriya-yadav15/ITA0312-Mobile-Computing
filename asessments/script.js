```javascript
let users = JSON.parse(localStorage.getItem("jobAssistantUsers") || "{}");
let currentUser = "";

function register() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
        document.getElementById("message").textContent =
            "Please enter both username and password.";
        return;
    }

    if (users[username]) {
        document.getElementById("message").textContent =
            "Username already exists. Please login.";
        return;
    }

    users[username] = password;
    localStorage.setItem("jobAssistantUsers", JSON.stringify(users));

    // Automatically open the dashboard after registration
    currentUser = username;
    openDashboard();

    alert("Registration successful! Welcome to your dashboard.");
}

function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (users[username] && users[username] === password) {
        currentUser = username;
        openDashboard();
    } else {
        document.getElementById("message").textContent =
            "Invalid details. Register first or check your login.";
    }
}

function openDashboard() {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("appSection").classList.remove("hidden");
    document.getElementById("message").textContent = "";
    loadDetails();
}

function saveDetails() {
    const details = {
        name: document.getElementById("fullName").value.trim(),
        email: document.getElementById("email").value.trim(),
        qualification: document.getElementById("qualification").value.trim(),
        skills: document.getElementById("skills").value.trim()
    };

    if (!details.name || !details.email ||
        !details.qualification || !details.skills) {
        document.getElementById("detailsMessage").textContent =
            "Please fill in all personal details.";
        return;
    }

    localStorage.setItem(
        "jobDetails_" + currentUser,
        JSON.stringify(details)
    );

    document.getElementById("detailsMessage").textContent =
        "Personal details saved successfully!";
}

function loadDetails() {
    const saved = localStorage.getItem("jobDetails_" + currentUser);

    if (!saved) return;

    const details = JSON.parse(saved);
    document.getElementById("fullName").value = details.name || "";
    document.getElementById("email").value = details.email || "";
    document.getElementById("qualification").value =
        details.qualification || "";
    document.getElementById("skills").value = details.skills || "";
}

function uploadResume() {
    const file = document.getElementById("resume").files[0];
    const message = document.getElementById("resumeMessage");

    if (!file) {
        message.textContent = "Please select your resume first.";
        return;
    }

    const allowed = /\.(pdf|doc|docx)$/i;

    if (!allowed.test(file.name)) {
        message.textContent = "Please select a PDF or Word resume.";
        return;
    }

    message.textContent = "Resume selected successfully: " + file.name;
}

function chooseJob() {
    const job = document.getElementById("job").value;

    if (!job) {
        document.getElementById("jobMessage").textContent =
            "Please select a job.";
        return;
    }

    document.getElementById("jobMessage").textContent =
        "You selected: " + job + ". Your job preference has been recorded.";
}

function subscribe() {
    document.getElementById("subscriptionMessage").textContent =
        "Demo subscription activated successfully!";
}

function logout() {
    currentUser = "";

    document.getElementById("appSection").classList.add("hidden");
    document.getElementById("loginSection").classList.remove("hidden");

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("message").textContent = "";
}
```