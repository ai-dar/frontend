
const now = new Date();
document.getElementById("dateTime").textContent = now.toLocaleString();

document.getElementById("toggleThemeBtn").addEventListener("click", function() {
    const currentTheme = document.body.classList.toggle('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme); 
    playSound();
});

window.addEventListener('load', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

document.getElementById("subscribeBtn").addEventListener("click", function() {
    document.getElementById("popupForm").style.display = "block";
    playSound(); 
});

document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popupForm").style.display = "none";
});

function playSound() {
    let audio = new Audio('115-sitcom-laugh.mp3'); 
    audio.play();
}

const ratings = [5, 3, 4, 2, 1];
document.getElementById("sortRatingsBtn").addEventListener("click", function() {
    const sortedRatings = ratings.sort((a, b) => b - a);
    alert("Оценки пользователей (по убыванию): " + sortedRatings.join(', '));
});

document.getElementById("getWeatherBtn").addEventListener("click", function() {
    const city = "Almaty";  
    const apiKey = "a184cec28e18696aa72e9629c0f4f09c"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = data.weather[0].description;
            const temp = data.main.temp;
            document.getElementById("weatherDisplay").textContent = `Погода в ${city}: ${weather}, Температура: ${temp}°C`;
            
        })
        .catch(error => console.log("Error!!: ", error));
});
