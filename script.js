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

// Боковая панель
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("open");
}

// Регистрация и вход
function showRegisterForm() {
    const email = prompt("Введите ваш email:");
    if (!email) return;

    const code = prompt("Введите код, который был отправлен на ваш email:");
    if (!code) return;

    const password = prompt("Введите пароль:");
    if (!password) return;

    const username = prompt("Введите ваш псевдоним:");
    const avatar = prompt("Ссылка на ваш аватар? (по желанию)");

    localStorage.setItem("user", JSON.stringify({ email, code, password, username, avatar }));
    loadProfile();
}

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

function loadProfile() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        document.getElementById("profile-section").style.display = "block";
        document.getElementById("register-btn").style.display = "none";
        document.getElementById("login-btn").style.display = "none";

        document.getElementById("username").innerText = user.username;

        const avatar = document.getElementById("user-avatar");
        if (user.avatar) {
            avatar.src = user.avatar;
            avatar.style.display = "block"; // Показываем аватар
        } else {
            avatar.style.display = "none"; // Если нет аватарки, скрываем
        }
    }
}

// Выход из профиля
function logout() {
    localStorage.removeItem("user");
    document.getElementById("profile-section").style.display = "none";
    document.getElementById("register-btn").style.display = "block";
    document.getElementById("login-btn").style.display = "block";
    loadPosts();
}

// Добавить пост
function addPost() {
    if (!currentInterest) {
        alert("Сначала выберите раздел!");
        return;
    }

    const content = document.getElementById("post-content").value;
    const mediaInput = document.getElementById("media-input");
    const mediaFile = mediaInput.files[0];

    if (!content && !mediaFile) {
        alert("Введите текст или добавьте изображение!");
        return;
    }

    const posts = JSON.parse(localStorage.getItem(currentInterest) || "[]");
    const newPost = { content, mediaUrl: null, replies: [], username: '', avatar: '' };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        newPost.username = user.username;
        newPost.avatar = user.avatar || ''; // добавляем аватарку, если она есть
    }

    if (mediaFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            newPost.mediaUrl = event.target.result;
            posts.push(newPost);
            localStorage.setItem(currentInterest, JSON.stringify(posts));
            loadPosts();
        };
        reader.readAsDataURL(mediaFile);
    } else {
        posts.push(newPost);
        localStorage.setItem(currentInterest, JSON.stringify(posts));
        loadPosts();
    }

    document.getElementById("post-content").value = "";
    mediaInput.value = "";
}

// Загрузка постов
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem(currentInterest) || "[]");
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";

    posts.forEach((post, index) => {
        const postDiv = createPostElement(post, index);
        postList.appendChild(postDiv);
    });
}

// Создание элемента поста с поддержкой ответов
function createPostElement(post, index) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `
        <div class="post-header">
            <img src="${post.avatar || ''}" alt="Avatar" class="post-avatar">
            <p class="post-username">${post.username}</p>
        </div>
        <p>${post.content}</p>
    `;

    if (post.mediaUrl) {
        const img = document.createElement("img");
        img.src = post.mediaUrl;
        postDiv.appendChild(img);
    }

    const replyButton = document.createElement("button");
    replyButton.innerText = "Ответить";
    replyButton.onclick = () => addReply(index, null);
    postDiv.appendChild(replyButton);

    if (post.replies) {
        post.replies.forEach((reply, replyIndex) => {
            postDiv.appendChild(createReplyElement(reply, index, replyIndex));
        });
    }

    return postDiv;
}

// Добавление ответа
function addReply(postIndex, replyIndex) {
    const replyContent = prompt("Введите ваш ответ:");
    if (!replyContent) return;

    const posts = JSON.parse(localStorage.getItem(currentInterest) || "[]");
    const newReply = { content: replyContent, replies: [] };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        newReply.username = user.username;
        newReply.avatar = user.avatar || ''; // добавляем аватарку, если она есть
    }

    if (replyIndex === null) {
        posts[postIndex].replies = posts[postIndex].replies || [];
        posts[postIndex].replies.push(newReply);
    } else {
        posts[postIndex].replies[replyIndex].replies = posts[postIndex].replies[replyIndex].replies || [];
        posts[postIndex].replies[replyIndex].replies.push(newReply);
    }

    localStorage.setItem(currentInterest, JSON.stringify(posts));
    loadPosts();
}
