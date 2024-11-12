document.addEventListener("DOMContentLoaded", loadPosts);

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    const postList = document.getElementById("post-list");
    postList.innerHTML = "";
    posts.forEach((post, index) => {
        const postElement = createPostElement(post, index);
        postList.appendChild(postElement);
    });
}

function addPost() {
    const content = document.getElementById("post-content").value;
    if (!content) return alert("Введите текст!");

    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts.push({ content, replies: [] });
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("post-content").value = "";
    loadPosts();
}

function addReply(index) {
    const replyContent = prompt("Введите ответ:");
    if (!replyContent) return;

    const posts = JSON.parse(localStorage.getItem("posts") || "[]");
    posts[index].replies.push(replyContent);
    localStorage.setItem("posts", JSON.stringify(posts));

    loadPosts();
}

function createPostElement(post, index) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.innerHTML = `<p>${post.content}</p>`;

    const replyButton = document.createElement("span");
    replyButton.className = "reply-button";
    replyButton.innerText = "Ответить";
    replyButton.onclick = () => addReply(index);
    postDiv.appendChild(replyButton);

    post.replies.forEach(reply => {
        const replyDiv = document.createElement("div");
        replyDiv.className = "reply";
        replyDiv.innerText = reply;
        postDiv.appendChild(replyDiv);
    });

    return postDiv;
}

// Объявления (используйте Firebase или localStorage для хранения)
function loadBoardPosts() {
    // Реализация загрузки объявлений
}

function addBoardPost() {
    const content = document.getElementById("board-content").value;
    if (!content) return alert("Введите текст объявления!");

    // Сохранение объявления
    document.getElementById("board-content").value = "";
    loadBoardPosts();
}

// Firebase: регистрация и вход
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            user.sendEmailVerification();
            alert("Письмо для подтверждения отправлено.");
        })
        .catch((error) => {
            console.error(error.message);
        });
}

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    firebase.auth().signInWithEmailAndPassword(email,
