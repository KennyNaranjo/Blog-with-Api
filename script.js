urlPosts = "http://localhost:3000/posts"
urlUsers = "http://localhost:3000/users"
urlComments = "http://localhost:3000/comments"
parentElement = document.querySelector(".parent-box");
modalBody = document.querySelector(".modal-body");
modalHeader = document.querySelector(".modal-header");
allArticle = document.querySelectorAll("article");
modalBtnClose = document.querySelector(".btn-close");
modalFade = document.querySelector(".modal fade");



allArticle = document.addEventListener("click", showModal);
function showModal(){
    const modalPost = new bootstrap.Modal(document.getElementById('modal-id'))
    modalPost.show();
    
}






fetch(urlPosts)
.then(responsePost => responsePost.json())
.then(dataPost => {
    dataPost.forEach( post => {
        const articlePost = document.createElement("article");
        const titlePost = document.createElement("h4");
        articlePost.classList = "col bg-primary m-3 text-center p-3 rounded numPost"
        titlePost.textContent = post.title;
        articlePost.append(titlePost);
        parentElement.appendChild(articlePost );
    });
    
});



// fetch(urlUsers)
// .then(responseUsers => responseUsers.json())
// .then(dataUsers => );

// fetch(urlComments)
// .then(responseComments => responseComments.json())
// .then(dataComments => )