const now = new Date();
document.getElementById("dateTime").textContent = now.toLocaleString();

let isSignUp = false;
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const toggleAuthMode = document.getElementById("toggleAuthMode");
const authBtn = document.getElementById("authBtn");
const userDisplayName = document.getElementById("userDisplayName"); // Для отображения имени пользователя

window.addEventListener("load", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        authBtn.textContent = "Logout";
        authBtn.href = "#";
        authBtn.addEventListener("click", handleLogout);
        userDisplayName.textContent = `Welcome, ${loggedInUser}`;
    } else {
        authBtn.textContent = "Login";
        authBtn.href = "loginpage.html";
        userDisplayName.textContent = ""; // Очищаем имя пользователя, если он не вошел в систему
    }
});

toggleAuthMode.addEventListener("click", function (event) {
    event.preventDefault();
    isSignUp = !isSignUp;

    if (isSignUp) {
        formTitle.textContent = "Create a New Account";
        submitBtn.textContent = "Sign Up";
        toggleAuthMode.textContent = "Already have an account? Sign in";
    } else {
        formTitle.textContent = "Login to Your Account";
        submitBtn.textContent = "Login";
        toggleAuthMode.textContent = "Don't have an account? Sign up";
    }
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (isSignUp) {
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
        } else {
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Account created successfully! Please log in.");
            isSignUp = false;
            formTitle.textContent = "Login to Your Account";
            submitBtn.textContent = "Login";
            toggleAuthMode.textContent = "Don't have an account? Sign up";
        }
    } else {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", username);
            alert("Welcome, " + username + "!");
            authBtn.textContent = "Logout";
            authBtn.href = "#";
            authBtn.addEventListener("click", handleLogout);
            userDisplayName.textContent = `Welcome, ${username}`; // Отображаем имя пользователя при входе
            window.location.href = "index.html";
        } else {
            alert("Invalid username or password.");
        }
    }
});

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    authBtn.textContent = "Login";
    authBtn.href = "loginpage.html";
    userDisplayName.textContent = ""; // Очищаем имя пользователя при выходе
}
