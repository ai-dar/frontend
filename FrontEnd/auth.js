document.addEventListener("DOMContentLoaded", () => {
    const authBtn = document.getElementById("authBtn");
    const userDisplayName = document.createElement("span"); 
    userDisplayName.classList.add("text-white", "me-3"); 
    authBtn.parentElement.insertBefore(userDisplayName, authBtn); 

    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        authBtn.textContent = "Logout";
        authBtn.href = "#";
        authBtn.addEventListener("click", handleLogout);
        userDisplayName.textContent = `${loggedInUser}`; 
    } else {
        authBtn.textContent = "Login";
        authBtn.href = "loginpage.html";
        userDisplayName.textContent = ""; 
    }
});

function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("loggedInUser");
    alert("You have been logged out.");
    location.reload();
}
