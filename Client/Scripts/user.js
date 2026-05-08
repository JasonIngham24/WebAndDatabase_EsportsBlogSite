import { fetchData } from "./main.js"

const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');

if (registrationForm) {
    registrationForm.addEventListener('submit', register);
}
if (loginForm) {
    loginForm.addEventListener('submit', login);
}

document.addEventListener('DOMContentLoaded', () => {
    const updateUserForm = document.getElementById('update-user-form');
    const updatePasswordForm = document.getElementById('update-password-form');
    const deleteAccountButton = document.getElementById('delete-account-button');
    const logoutButton = document.getElementById('logout-button');

    if (updateUserForm) {
        loadUserData();
        updateUserForm.addEventListener('submit', updateUserInfo);
    }
    if (updatePasswordForm) {
        updatePasswordForm.addEventListener('submit', updateUserPassword);
    }
    if (deleteAccountButton) {
        deleteAccountButton.addEventListener('click', deleteAccount);
    }
});

function register(event) {
    event.preventDefault()

    let user = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    fetchData('/users/register', user, 'POST')
    .then(data => {
        if(!data.message) {
            setCurrentUser(data)
            window.location = "post.html"
        }
    })
    .catch(err => {
        let error = document.getElementById("error")
        error.innerText=err.message
        document.getElementById("password").value=""
    })
} 

function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(checkPassword(password)) {
        const user = {
            email: email,
            password: password
        }
        // make fetch call to login route in server's user.js route file
        fetchData('/users/login', user, 'POST')
        .then(data => {
          if(!data.message) {
            setCurrentUser(data)
            window.location = "post.html"
          }
        })
        .catch(err => {
          let error = document.getElementById("error")
          error.innerText=err.message
          document.getElementById("password").value=""
        })
        
    } else {
        console.log("Password sucks! Do better.")
    }
}

function checkPassword(password) {
    return true;
}

function setCurrentUser(user){
    localStorage.setItem("user", JSON.stringify(user))
}

export function getCurrentUser(){
    return JSON.parse(localStorage.getItem("user"))
}

export function removeCurrentUser(){
    localStorage.removeItem("user")
}

function loadUserData() {
    const cUser = getCurrentUser();
    if (cUser) {
        document.getElementById('firstName').value = cUser.user_first_name;
        document.getElementById('lastName').value = cUser.user_last_name;
        document.getElementById('username').value = cUser.user_name;
        document.getElementById('email').value = cUser.user_email;
    }
}

function updateUserInfo(event) {
    event.preventDefault();
    const user = getCurrentUser();
    const updatedInfo = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value
    };

    fetchData(`/users/${user.user_id}`, updatedInfo, 'PUT')
        .then(data => {
            if (!data.message) {
                setCurrentUser(data);
                alert('Information updated successfully!');
            }
        })
        .catch(err => {
            let error = document.getElementById("error")
            if(error) error.innerText=err.message
            console.error(err);
        });
}

function updateUserPassword(event) {
    event.preventDefault();
    const user = getCurrentUser();
    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;

    fetchData(`/users/password/${user.user_id}`, { oldPassword, newPassword }, 'PUT')
        .then(data => {
            if (data.message === 'Password updated successfully') {
                alert('Password updated successfully!');
                document.getElementById('update-password-form').reset();
            }
        })
        .catch(err => {
            alert(err.message);
            console.error(err);
        });
}

function deleteAccount() {
    const user = getCurrentUser();
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
        fetchData(`/users/${user.user_id}`, {}, 'DELETE')
            .then(data => {
                if (data.message === 'User deleted successfully') {
                    removeCurrentUser();
                    window.location.href = 'index.html';
                }
            })
            .catch(err => {
                alert(err.message);
                console.error(err);
            });
    }
}

function logout() {
    removeCurrentUser();
    window.location.href = 'index.html';
}
