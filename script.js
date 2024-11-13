// Переключение темной и светлой темы
function toggleTheme() {
    document.body.classList.toggle("light-theme");
    const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", theme);
}

// Загрузка сохраненной темы
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }
    loadPosts();
});

let currentInterest = ''; // Текущий выбранный интерес

// Функция для загрузки постов по интересам
function loadInterest(interest) {
    currentInterest = interest;
    document.getElementById("current-interest").innerText = `Раздел: ${interest}`;
    loadPosts();
}

// Загрузка постов из localStorage по текущему интересу
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem(currentInterest) || "[]");
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";
    posts.forEach((post, index) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerText = post;
        postList.appendChild(postDiv);
    });
}

// Добавление нового поста
function addPost() {
    if (!currentInterest) {
        alert("Сначала выберите раздел!");
        return;
    }
    const content = document.getElementById("post-content").value;
    if (!content) {
        alert("Введите текст сообщения!");
        return;
    }

    const posts = JSON.parse(localStorage.getItem(currentInterest) || "[]");
    posts.push(content);
    localStorage.setItem(currentInterest, JSON.stringify(posts));
    document.getElementById("post-content").value = ""; // Очистка поля ввода
    loadPosts(); // Перезагрузка постов для обновления списка
}
