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
    loadProfile();
});

// Загрузка постов
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postList = document.getElementById("post-list");
    postList.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerHTML = `
            <p><strong>${post.username || "Аноним"}</strong>: ${post.content}</p>
            <img src="${post.media}" alt="media" class="post-media">
        `;
        postList.appendChild(postElement);
    });
}

// Добавление поста
function addPost() {
    const content = document.getElementById("post-content").value;
    const media = document.getElementById("media-input").files[0];
    const user = JSON.parse(localStorage.getItem("user"));

    const newPost = {
        username: user ? user.username : "Аноним", // Если пользователь есть, добавляем его имя
        content: content,
        media: media ? URL.createObjectURL(media) : ""
    };

    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));

    loadPosts();
}

// Регистрация
function showRegisterForm() {
    const email = prompt("Введите ваш email:");
    if (!email) return;

    const code = prompt("Введите код, который был отправлен на ваш email:");
    if (!code) return;

    const password = prompt("Введите пароль:");
    if (!password) return;

    const username = prompt("Введите ваш псевдоним:");
    const avatar = prompt("Ссылка на ваш аватар? (по желанию)");

    const user = { email, code, password, username, avatar };
    localStorage.setItem("user", JSON.stringify(user));

    loadProfile();
}

// Вход
function showLoginForm() {
    const email = prompt("Введите ваш email:");
    const password = prompt("Введите ваш пароль:");

    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.password === password) {
        loadProfile();
    } else {
        alert("Неверный логин или пароль");
    }
}

// Загрузка профиля
function loadProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("profile-section").style.display = "block";
        document.getElementById("auth-section").style.display = "none";

        document.getElementById("username").innerText = user.username;
        const avatar = document.getElementById("user-avatar");
        avatar.src = user.avatar || "https://via.placeholder.com/50"; // Поставить стандартное изображение, если нет аватара
    } else {
        document.getElementById("profile-section").style.display = "none";
        document.getElementById("auth-section").style.display = "block";
    }
}

// Выход
function logout() {
    localStorage.removeItem("user");
    loadProfile();
}
