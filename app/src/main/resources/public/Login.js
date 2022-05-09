let loginForm = document.getElementById("login-form");

loginForm.addEventListener('submit', handleLogin);

function handleLogin(e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let login = {
        email: username,
        password: password
    };

    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8080/Login.html");

    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            let res = this.responseText;
            let status = this.status;

            console.log("Response:", res);
            console.log("Status:", status);
        }
    }

    xhr.send(JSON.stringify(login));

    console.log(`Logging in user: ${username} with password ${password}`);
}