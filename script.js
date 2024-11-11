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
