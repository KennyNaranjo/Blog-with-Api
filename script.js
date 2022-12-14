const urlPosts = "http://localhost:3000/posts"
const urlUsers = "http://localhost:3000/users"
const urlComments = "http://localhost:3000/comments"
const parentElement = document.querySelector(".parent-box");
const postTitle = document.querySelector(".post-title");
const postText = document.querySelector(".post-text");
const modalId = document.querySelector("#modal-id")

fetch(urlPosts)
.then(responsePost => responsePost.json())
.then(dataPost => {
    dataPost.forEach( post => {
        allData(post);
    });
});


function allData(post){
    const articlePost = document.createElement("article");
    const titleCard = document.createElement("h6");
    const imgCard = document.createElement("img");
    imgCard.setAttribute("src", "./assets/img/4kfigures.jpg");
    articlePost.setAttribute("data-bs-toggle","modal");
    articlePost.setAttribute("data-bs-target", "#modal-id");
    articlePost.setAttribute("role", "button");
    articlePost.classList = "col bg-secondary m-2 p-2 rounded text-center";
    titleCard.classList = "p-2 text-white";
    imgCard.classList = "img-fluid";
    titleCard.textContent = post.title;
    postTitle.textContent = post.title;
    postText.textContent = post.body
    articlePost.append(imgCard, titleCard);
    parentElement.appendChild(articlePost);
    
   
}

// fetch(urlUsers)
// .then(responseUsers => responseUsers.json())
// .then(dataUsers => );

// fetch(urlComments)
// .then(responseComments => responseComments.json())
// .then(dataComments => )