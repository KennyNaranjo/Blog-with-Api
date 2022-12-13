const urlPosts = "http://localhost:3000/posts"
const urlUsers = "http://localhost:3000/users"
const urlComments = "http://localhost:3000/comments"
const parentElement = document.querySelector(".parent-box");
const postTitle = document.querySelector(".post-title");
const postText = document.querySelector(".post-text");


fetch(urlPosts)
.then(responsePost => responsePost.json())
.then(dataPost => {
    dataPost.forEach( post => {
        allData(post)
    });
});


function allData(post){
    const articlePost = document.createElement("article");
    const titlePost = document.createElement("h5");
    const imgCard = document.createElement("img")
    articlePost.setAttribute("data-bs-toggle","modal");
    articlePost.setAttribute("data-bs-target", "#modal-id" + post.id);
    articlePost.setAttribute("role", "button")
    articlePost.classList = "col bg-secondary m-2 p-2 rounded text-center ";
    
    titlePost.textContent = post.title;
    postTitle.textContent = post.title;
    postText.textContent = post.body;
    imgCard.classList = "img-thumbnail"
    imgCard.setAttribute("src", "4kfigures.jpg")
    
    titlePost.classList = "p-2 text-white";
    articlePost.append(imgCard, titlePost);
    
    parentElement.appendChild(articlePost);
    
   
}

// fetch(urlUsers)
// .then(responseUsers => responseUsers.json())
// .then(dataUsers => );

// fetch(urlComments)
// .then(responseComments => responseComments.json())
// .then(dataComments => )