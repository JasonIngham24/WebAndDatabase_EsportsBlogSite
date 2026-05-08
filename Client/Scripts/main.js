import {getCurrentUser, removeCurrentUser} from "./user.js"

let cUser = getCurrentUser()
const nav = document.querySelector("nav")

if(cUser){
    nav.innerHTML = `
        <a href="index.html">Home</a>
        <a href="user.html">My Account</a>
        <a id="logout">Logout</a></li>
        <a href="post.html">Posts</a>
    `
}
else{
    nav.innerHTML = `
        <a href="index.html">Home</a>
        <a href="register.html">Register</a>
        <a href="login.html">Login</a>
    `
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
  const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType, // *POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  if (response.ok) {
    return await response.json(); // parses JSON response into native JavaScript objects
  } else {
    throw await response.json();
  }
}

export { fetchData }