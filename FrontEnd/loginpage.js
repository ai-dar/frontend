const now = new Date();
document.getElementById("dateTime").textContent = now.toLocaleString();

document.querySelector("form").addEventListener("submit", function(event) {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (password.length < 6) {
        alert("Пароль должен содержать минимум 6 символов");
        event.preventDefault();
    } else {
        localStorage.setItem('loggedInUser', username); 
        alert("Hello " + username);
    }
});

window.addEventListener('load', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        alert("Welcome back, " + loggedInUser);
    }
});
