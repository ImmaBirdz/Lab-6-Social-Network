const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

container.addEventListener("transitionend", () => {
    const activeForm = document.querySelector(".form-container:not(.right-panel-active)");
    if (activeForm) {
        const inputs = activeForm.querySelectorAll("input");
      
    }
});

// login-fixed
document.querySelector('.login-container form').addEventListener('submit', (event) => {
    event.preventDefault(); 
    const email = document.querySelector('.login-container input[type="email"]').value;
    const password = document.querySelector('.login-container input[type="password"]').value;

    if (email && password) {
        

        
        window.location.href = "page.html";//link page 
    } else {
        alert('Please fill in both email and password.');
    }
});

//  register-fixed
document.querySelector('.register-container form').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const name = document.querySelector('.register-container input[type="text"]').value;
    const email = document.querySelector('.register-container input[type="email"]').value;
    const password = document.querySelector('.register-container input[id="password"]').value;
    const confirmPassword = document.querySelector('.register-container input[placeholder="Confirm Password"]').value;
    const birthday = document.querySelector('.register-container input[type="date"]').value;
    const gender = document.querySelector('.register-container input[placeholder="Gender"]').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (name && email && password && birthday && gender) {

        window.location.href = "profile.html";//link profile
    } else {
        alert('Please fill in all fields.');
    }
});
