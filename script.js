const urlPosts = "http://localhost:3000/posts";
const urlUsers = "http://localhost:3000/users";
const urlComments = "http://localhost:3000/comments";
const parentElement = document.querySelector(".parent-box");
const postTitle = document.querySelector(".post-title");
const postText = document.querySelector(".post-text");
const modalId = document.querySelector("#modal-id");
const modalBody = document.querySelector(".modal-body");
const modalUserName = document.querySelector(".user-name");
const modalEmail = document.querySelector(".email");
const modalComments = document.querySelector(".btn-info");

fetch(urlPosts)
.then(responsePost => responsePost.json())
.then(dataPost => {
    dataPost.forEach( post => {
        allData(post);
    });

});


function allData(post) {
    const articlePost = document.createElement("article");
    const titleCard = document.createElement("h6");
    const imgCard = document.createElement("img");
    imgCard.setAttribute("src", "./assets/img/4kfigures.jpg");
    articlePost.setAttribute("data-bs-toggle","modal");
    articlePost.setAttribute("data-bs-target", "#modal-id");
    articlePost.setAttribute("role", "button");
    imgCard.setAttribute("data-id", post.id);
    titleCard.setAttribute("data-id", post.id);
    articlePost.setAttribute("data-id", post.id);
    articlePost.classList = "col bg-secondary m-2 p-2 rounded text-center article-selector";
    titleCard.classList = "p-2 text-white";
    imgCard.classList = "img-fluid";
    titleCard.textContent = post.title;
    articlePost.addEventListener("click", triggerModal);
    modalComments.addEventListener("click", triggerModalComments)
    articlePost.append(imgCard, titleCard);
    parentElement.appendChild(articlePost);
    
}

function triggerModal(e) {
    const dataId = e.target.getAttribute("data-id");
    fetch("http://localhost:3000/posts/" + dataId)
    .then(responsePostId => responsePostId.json())
    .then(data => {
        postTitle.textContent = data.title;
        postText.textContent = data.body;
        fetch("http://localhost:3000/users/" + data.userId)
        .then(responseUserId => responseUserId.json())
        .then(data => {
            modalUserName.textContent = data.username;
            modalEmail.textContent = data.email;
        });
        
    })
}

fetch(urlComments)
.then(responsePost => responsePost.json())
.then(dataPost => {
    dataPost.forEach( data => {
        allDataComments(data);
    });

});


function allDataComments(data){
    console.log(data.postId)
    // articles.setAttribute("comment-id", data.postId)
}


function triggerModalComments(e) {
    const article = e.target.getAttribute("comment-id");
    fetch("http://localhost:3000/comments/" )
    .then(responsePostId => responsePostId.json())
    .then(data => console.log(data.postId))

}


