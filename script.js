urlPosts = "http://localhost:3000/posts"
urlUsers = "http://localhost:3000/users"
urlComments = "http://localhost:3000/comments"
parentElement = document.querySelector(".parent-box");
modalBody = document.querySelector(".modal-body");
modalHeader = document.querySelector(".modal-header");

    // const modalTittle = document.createElement ("h5")
    // modalTittle.textContent = titlePost;
    // modalHeader.append(modalTittle);
        



fetch(urlPosts)
.then(responsePost => responsePost.json())
.then(dataPost => {
    dataPost.forEach( post => {
        const articlePost = document.createElement("article");
        const titlePost = document.createElement("h5");
        articlePost.setAttribute("data-bs-toggle","modal")
        articlePost.setAttribute("data-bs-target", "#modal-id")
        articlePost.classList = "col bg-primary m-3 p-2 rounded numPost "
        titlePost.textContent = post.title;
        titlePost.classList = "p-2";    
        articlePost.append(titlePost);
        parentElement.appendChild(articlePost);
        
        
        
    });
    
});



// fetch(urlUsers)
// .then(responseUsers => responseUsers.json())
// .then(dataUsers => );

// fetch(urlComments)
// .then(responseComments => responseComments.json())
// .then(dataComments => )