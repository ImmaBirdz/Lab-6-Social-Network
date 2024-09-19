const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");
const hello = document.getElementById('falling-hello');

// Event listener to switch between registration and login forms
registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

// Reset form input fields when transitioning between forms
container.addEventListener("transitionend", () => {
    const activeForm = document.querySelector(".form-container:not(.right-panel-active)");
    if (activeForm) {
        const inputs = activeForm.querySelectorAll("input");
        // You can reset input fields here if needed
    }
});

// Login form submission
document.querySelector('.login-container form').addEventListener('submit', (event) => {
    event.preventDefault(); 
    const email = document.querySelector('.login-container input[type="email"]').value;
    const password = document.querySelector('.login-container input[type="password"]').value;

    if (email && password) {
        window.location.href = "page.html"; // Redirect to another page
    } else {
        alert('Please fill in both email and password.');
    }
});

// Registration form submission
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
        window.location.href = "profile.html"; // Redirect to profile page
    } else {
        alert('Please fill in all fields.');
    }
});

// "Hello" falling animation on page load
window.onload = function() {
    // Start the falling animation for "Hello" text
    setTimeout(function() {
        hello.classList.add('animate');
    }, 500); // Adjust delay before "Hello" starts falling
};
