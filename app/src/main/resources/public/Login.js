let url = "http://localhost:8080/";

let loginForm = document.getElementById("login-form");

loginForm.addEventListener('submit', handleLogin);

function handleLogin(e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    console.log(`Logging in user: ${username} with password ${password}`);
}