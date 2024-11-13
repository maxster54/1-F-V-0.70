// Переключение между темной и светлой темами
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

let currentInterest = '';

// Загрузка постов по интересам
function loadInterest(interest) {
    currentInterest = interest;
    document.getElementById("current-interest").innerText = `Раздел: ${interest}`;
    loadPosts();
}

// Загрузка постов из localStorage
function loadPosts() {
    const posts = JSON.parse(localStorage.getItem(currentInterest) || "[]");
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";
    posts.forEach((post, index) => {
        const postElement = createPostElement(post, index);
        postList.appendChild(postElement);
    });
}

// Добавление нового поста
function addPost() {
    const content = document.getElementById("post-content").value;
    const mediaInput = document.getElementById("media-input");
    const mediaFile = mediaInput.files[0];

    if (!content && !mediaFile) {
        alert("Введите текст или добавьте медиафайл!");
        return;
    }

    const posts = JSON.parse(localStorage.getItem(currentInterest) || "[]");
    const newPost = { content, mediaUrl: null, mediaType: null };

    if (mediaFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            newPost.mediaUrl = event.target.result;
            newPost.mediaType = mediaFile.type;
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

// Создание элемента поста
function createPostElement(post, index) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `<p>${post.content}</p>`;

    if (post.mediaUrl) {
        if (post.mediaType.startsWith("image")) {
            const img = document.createElement("img");
            img.src = post.mediaUrl;
            postDiv.appendChild(img);
        } else if (post.mediaType.startsWith("video")) {
            const video = document.createElement("video");
            video.src = post.mediaUrl;
            video.controls = true;
            postDiv.appendChild(video);
        }
    }

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.innerText = "Удалить";
    deleteButton.onclick = () => deletePost(index);
    postDiv.appendChild(deleteButton);

    return postDiv;
}

// Удаление поста
function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem(currentInterest) || "[]");
    posts.splice(index, 1);
    localStorage.setItem(currentInterest, JSON.stringify(posts));
    loadPosts();
}
