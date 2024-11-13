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

// Загрузка постов по интересам
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
        const postDiv = createPostElement(post, index);
        postList.appendChild(postDiv);
    });
}

// Создание элемента поста с поддержкой ответов
function createPostElement(post, index) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `<p>${post.content}</p>`;

    // Если есть изображение, добавляем его
    if (post.mediaUrl) {
        const img = document.createElement("img");
        img.src = post.mediaUrl;
        postDiv.appendChild(img);
    }

    // Кнопка для добавления ответа на пост
    const replyButton = document.createElement("button");
    replyButton.innerText = "Ответить";
    replyButton.onclick = () => addReply(index);
    postDiv.appendChild(replyButton);

    // Добавляем все ответы к посту
    if (post.replies) {
        post.replies.forEach(reply => {
            const replyDiv = document.createElement("div");
            replyDiv.className = "reply";
            replyDiv.innerHTML = `<p>${reply.content}</p>`;

            // Если у ответа есть изображение
            if (reply.mediaUrl) {
                const replyImg = document.createElement("img");
                replyImg.src = reply.mediaUrl;
                replyDiv.appendChild(replyImg);
            }
            postDiv.appendChild(replyDiv);
        });
    }

    return postDiv;
}

// Добавление нового поста
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
    const newPost = { content, mediaUrl: null, replies: [] };

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

// Функция для добавления ответа на пост
function addReply(postIndex) {
    const replyContent = prompt("Введите ваш ответ:");
    if (!replyContent) return;

    const posts = JSON.parse(localStorage.getItem(currentInterest) || "[]");
    const newReply = { content: replyContent, mediaUrl: null };
    
    // Добавляем новый ответ к выбранному посту
    posts[postIndex].replies = posts[postIndex].replies || [];
    posts[postIndex].replies.push(newReply);

    localStorage.setItem(currentInterest, JSON.stringify(posts));
    loadPosts();
}
