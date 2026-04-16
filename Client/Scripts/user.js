const registrationForm = document.getElementById('registrationForm');
const loginForm = document.getElementById('loginForm');

if (registrationForm) {
    registrationForm.addEventListener('submit', register);
}
if (loginForm) {
    loginForm.addEventListener('submit', login);
}

function register(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const accountType = document.querySelector('input[name="accountType"]:checked').value;

    const user = {
        firstName,
        lastName,
        email,
        password,
        accountType
    };

    console.log(user);
}

function login(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {
        email,
        password
    };

    console.log(user);
}
