import {getCurrentUser, removeCurrentUser} from "./user.js"

let cUser = getCurrentUser()
const nav = document.querySelector("nav")
const createPostButton = document.querySelector(".btn-create-post");

if(cUser){
    nav.innerHTML = `
        <a href="index.html">Home</a>
        <a href="post.html">Posts</a>
        <a href="user.html">My Account</a>
        <a id="logout">Logout</a></li>
    `;
    if (createPostButton) {
        createPostButton.textContent = 'Create Post';
        createPostButton.addEventListener('click', () => {
            window.location.href='create-post.html';
        });
    }
}
else{
    nav.innerHTML = `
        <a href="index.html">Home</a>
        <a href="post.html">Posts</a>
        <a href="register.html">Register</a>
        <a href="login.html">Login</a>
    `;
    if (createPostButton) {
        createPostButton.style.display = 'none';
    }
}

let logout = document.getElementById("logout")
if(logout){
    logout.addEventListener("click", e => {
        e.preventDefault()
        removeCurrentUser()
        window.location = "login.html"
    })
}

async function fetchData(route = '', data = {}, methodType) {
  const options = {
    method: methodType,
    headers: {
      'Content-Type': 'application/json'
    },
  };

  if (methodType !== 'GET') {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`http://localhost:3000${route}`, options);
  
  if (response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}

export { fetchData }