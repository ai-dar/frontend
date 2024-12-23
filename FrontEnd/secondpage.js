const now = new Date();
document.getElementById("dateTime").textContent = now.toLocaleString();

document.getElementById("surveyForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Предотвращаем отправку формы на сервер

    const nameInput = document.getElementById("q1").value;
    const commentInput = document.getElementById("q3").value;
    const ratingInput = document.getElementById("q2").value;

    if (nameInput === "" || commentInput === "") {
        alert("Пожалуйста, заполните все поля!");
    } else {
        const surveyData = {
            name: nameInput,
            comment: commentInput,
            rating: ratingInput,
            date: new Date().toLocaleString()
        };

        let surveyHistory = JSON.parse(localStorage.getItem("surveyHistory")) || [];
        surveyHistory.push(surveyData);

        localStorage.setItem("surveyHistory", JSON.stringify(surveyHistory));

        alert("THANKS!!!!!!");

        // Очищаем форму после сохранения данных
        document.getElementById("surveyForm").reset();
    }
});

function displaySurveyHistory(surveyData) {
    const surveyHistoryList = document.getElementById("surveyHistoryList");

    if (surveyData.length === 0) {
        surveyHistoryList.innerHTML = "<p>History is empty.</p>";
    } else {
        let html = "<ul class='list-group'>";
        surveyData.forEach((survey) => {
            html += `<li class="list-group-item">
                        <strong>Name:</strong> ${survey.name}<br>
                        <strong>Rating:</strong> ${survey.rating}<br>
                        <strong>Comments:</strong> ${survey.comment}<br>
                        <strong>Date:</strong> ${survey.date}
                    </li>`;
        });
        html += "</ul>";
        surveyHistoryList.innerHTML = html;
    }
}

document.getElementById("showHistoryBtn").addEventListener("click", function() {
    const surveyHistory = JSON.parse(localStorage.getItem("surveyHistory")) || [];
    displaySurveyHistory(surveyHistory);
    document.getElementById("surveyHistoryList").style.display = "block"; // Показываем историю
});

document.getElementById("closeHistoryBtn").addEventListener("click", function() {
    document.getElementById("surveyHistoryList").style.display = "none"; // Скрываем историю
});

document.getElementById("applyFiltersBtn").addEventListener("click", function() {
    const nameFilter = document.getElementById("nameFilterInput").value.toLowerCase();
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const ratingFilter = document.getElementById("ratingFilter").value;
    const surveyHistory = JSON.parse(localStorage.getItem("surveyHistory")) || [];

    const filteredData = surveyHistory.filter(item => {
        const matchesName = nameFilter === "" || item.name.toLowerCase().includes(nameFilter);
        const matchesSearch = searchInput === "" || item.comment.toLowerCase().includes(searchInput);
        const matchesRating = ratingFilter === "" || item.rating === ratingFilter;
        return matchesName && matchesSearch && matchesRating;
    });

    displaySurveyHistory(filteredData);
    document.getElementById("surveyHistoryList").style.display = "block"; 
});
