const now = new Date();
document.getElementById("dateTime").textContent = now.toLocaleString();

document.querySelector("form").addEventListener("submit", function(event) {
    const nameInput = document.getElementById("q1").value;
    const commentInput = document.getElementById("q3").value;
    const ratingInput = document.getElementById("q2").value;

    if (nameInput === "" || commentInput === "") {
        alert("Пожалуйста, заполните все поля!");
        event.preventDefault();
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

        alert("Спасибо за участие в опросе!");
    }
});

document.getElementById("showHistoryBtn").addEventListener("click", function() {
    const surveyHistory = JSON.parse(localStorage.getItem("surveyHistory")) || [];
    const surveyHistoryList = document.getElementById("surveyHistoryList");

    if (surveyHistory.length === 0) {
        surveyHistoryList.innerHTML = "<p>История опросов пуста.</p>";
    } else {
        let html = "<ul class='list-group'>";
        surveyHistory.forEach((survey, index) => {
            html += `<li class="list-group-item">
                        <strong>Имя:</strong> ${survey.name}<br>
                        <strong>Рейтинг:</strong> ${survey.rating}<br>
                        <strong>Комментарий:</strong> ${survey.comment}<br>
                        <strong>Дата:</strong> ${survey.date}
                    </li>`;
        });
        html += "</ul>";
        surveyHistoryList.innerHTML = html;
    }
});
