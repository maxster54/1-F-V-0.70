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
        const postDiv = createPostElement(post);
        postList.appendChild(postDiv);
    });
}

// Создание нового элемента поста
function createPostElement(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `<p>${post.content}</p>`;

    // Если есть изображение, добавляем его
    if (post.mediaUrl) {
        const img = document.createElement("img");
        img.src = post.mediaUrl;
        postDiv.appendChild(img);
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
    const newPost = { content: content || "", mediaUrl: null };

    // Если есть медиафайл, добавляем его в пост
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

    document.getElementById("post-content").value = ""; // Очистка поля ввода текста
    mediaInput.value = ""; // Очистка поля выбора файла
}
