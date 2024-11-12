// Функция для переключения темы
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("theme", theme);
}

// Сохранение и загрузка настроек темы
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
    loadPosts();
    loadBoardPosts();
});

// Функция для загрузки тем
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";
    posts.forEach((post) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        postDiv.innerText = post;
        postList.appendChild(postDiv);
    });
}

// Добавление новой темы
function addPost() {
    const content = document.getElementById("post-content").value;
    if (!content) {
        alert("Введите текст!");
        return;
    }
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.push(content);
    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("post-content").value = "";
    loadPosts();
}

// Функция для загрузки объявлений
function loadBoardPosts() {
    const announcements = JSON.parse(localStorage.getItem("announcements") || "[]");
    const boardList = document.getElementById("board-list");
    boardList.innerHTML = "";
    announcements.forEach((announcement) => {
        const announcementDiv = document.createElement("div");
        announcementDiv.className = "announcement";
        announcementDiv.innerText = announcement;
        boardList.appendChild(announcementDiv);
    });
}

// Добавление нового объявления
function addBoardPost() {
    const content = document.getElementById("board-content").value;
    if (!content) {
        alert("Введите текст объявления!");
        return;
    }
    const announcements = JSON.parse(localStorage.getItem("announcements") || "[]");
    announcements.push(content);
    localStorage.setItem("announcements", JSON.stringify(announcements));
    document.getElementById("board-content").value = "";
    loadBoardPosts();
}

// Регистрация пользователя
function register() {
    alert("Регистрация временно недоступна. Функционал в разработке.");
}

// Вход пользователя
function login() {
    alert("Вход временно недоступен. Функционал в разработке.");
}
