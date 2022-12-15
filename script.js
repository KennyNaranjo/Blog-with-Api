// Endpoints

const urlPosts = "http://localhost:3000/posts";
const urlUsers = "http://localhost:3000/users";
const urlComments = "http://localhost:3000/comments";

// QuerySelectors 

const parentElement = document.querySelector(".parent-box");
const postTitle = document.querySelector(".post-title");
const postText = document.querySelector(".post-text");
const modalId = document.querySelector("#modal-id");
const modalBody = document.querySelector(".modal-body");
const modalUserName = document.querySelector(".user-name");
const modalEmail = document.querySelector(".email");
const modalComments = document.querySelector(".btn-info");
const modalFooter = document.querySelector(".modal-footer");
const comments = document.querySelector("#comments");
const deletePost = document.querySelector(".delete");








// API call, creating elements dynamically, giving them values in each post-card, and adding some classes and attributes


fetch(urlPosts)
.then(responsePost => responsePost.json())
.then(dataPost => {
    dataPost.forEach( post => {
        postData(post);
    });
});

function postData(post) {
    const articlePost = document.createElement("article");  
    const titleCard = document.createElement("h6");
    const imgCard = document.createElement("img");
    const enterPost = document.createElement("button")
    imgCard.setAttribute("src", "./assets/img/1.gif");
    enterPost.setAttribute("type", "button")
    enterPost.setAttribute("data-bs-toggle","modal");
    enterPost.setAttribute("data-bs-target", "#modal-id");
    enterPost.setAttribute("data-id", post.id);
    enterPost.textContent = "Post";
    enterPost.classList = "btn btn-secondary";
    titleCard.textContent = post.title;
    articlePost.classList = "col bg-dark m-2 p-2 rounded text-center article-selector";
    titleCard.classList = "p-2 text-white text-center css-style";
    imgCard.classList = "img-fluid rounded rounded-bottom";
    articlePost.append(imgCard, titleCard, enterPost);
    parentElement.appendChild(articlePost);
    enterPost.addEventListener("click", triggerModal);
    
}


//API calls, adding classes, adding values when the modal appears

function triggerModal(element) {
    const dataId = element.target.getAttribute("data-id");
    fetch("http://localhost:3000/posts/" + dataId)
    .then(responsePostId => responsePostId.json())
    .then(data => {
        postTitle.textContent = data.title;
        postTitle.classList = "p-2";
        postText.textContent = data.body;
        fetch("http://localhost:3000/users/" + data.userId)
        .then(responseUserId => responseUserId.json())
        .then(data => {
            modalUserName.textContent = data.username;
            modalEmail.textContent = data.email;
        });
    })


    //API call, creating elements dynamically, adding classes and adding values when the comments appears

    fetch("http://localhost:3000/comments?postId=" + dataId)
        .then(responsePost => responsePost.json())
        .then(data => {
            comments.textContent = "";
            data.forEach( i => {
                const commentBox = document.createElement("div");
                const paragraph = document.createElement("p");
                const titlePost = document.createElement("h6");
                const commentEmail = document.createElement("p");
                const commentIcon = document.createElement("i");
                const emailBox = document.createElement("div");
                paragraph.textContent = i.body;
                titlePost.textContent = i.name;
                commentEmail.textContent = i.email;
                emailBox.append(commentIcon, commentEmail);
                commentBox.append(titlePost, paragraph, emailBox);
                commentIcon.classList = "fa-regular fa-envelope d-inline m-2";
                commentBox.classList = "card p-2 p m-3 bg-dark text-white";
                emailBox.classList = "mt-2 mb-3";
                titlePost.classList = "m-2";
                paragraph.classList = "p-2";
                commentEmail.classList = "d-inline m-2 border p-1 rounded bg-secondary text-white";
                comments.append(commentBox);
            })
        });


    // API call and deleting object in db.json

    deletePost.addEventListener("click", postDelete)
    function postDelete(){
    fetch("http://localhost:3000/posts/" + dataId ,{method: "DELETE"})
    }        
}








