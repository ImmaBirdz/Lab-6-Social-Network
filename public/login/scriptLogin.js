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
        // Reset input fields here if needed
    }
});

// Display recent logins on page load
window.onload = function() {
    // Start the falling animation for "Hello" text
    setTimeout(function() {
        hello.classList.add('animate');
    }, 500); // Adjust delay before "Hello" starts falling

    // Display recent logins if available
    displayRecentLogins();
};

// Login form submission
document.querySelector('.login-container form').addEventListener('submit', (event) => {
    event.preventDefault(); 
    const email = document.querySelector('.login-container input[type="email"]').value;
    const password = document.querySelector('.login-container input[type="password"]').value;

    if (email && password) {
        // Save the login to recent logins
        saveRecentLogin(email, "John Doe"); // Replace with dynamic username if available
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
        // Optionally save to recent logins here
        saveRecentLogin(email, name);
        window.location.href = "profile.html"; // Redirect to profile page
    } else {
        alert('Please fill in all fields.');
    }
});

// Save recent login to localStorage
function saveRecentLogin(email, name) {
    let recentLogins = JSON.parse(localStorage.getItem('recentLogins')) || [];
    
    // Remove existing login if it already exists
    recentLogins = recentLogins.filter(login => login.email !== email);

    // Add the new login to the front of the array
    recentLogins.unshift({ email, name });

    // Limit to 5 recent logins
    if (recentLogins.length > 5) recentLogins.pop();

    localStorage.setItem('recentLogins', JSON.stringify(recentLogins));
}

// Display recent logins
function displayRecentLogins() {
    const recentLogins = JSON.parse(localStorage.getItem('recentLogins')) || [];
    
    const recentLoginBox = document.querySelector('.recent-login-box');
    
    if (recentLogins.length > 0) {
        recentLogins.forEach(login => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('recent-user');
            userDiv.innerHTML = `
                <img src="path_to_user_pic.jpg" alt="User Picture" class="user-pic">
                <p class="user-name">${login.name}</p>
                <button class="fast-login" data-email="${login.email}">Login as ${login.name}</button>
            `;
            recentLoginBox.appendChild(userDiv);
        });
    }
}

// Quick login when clicking a recent login
document.querySelector('.recent-login-box').addEventListener('click', (event) => {
    if (event.target.classList.contains('fast-login')) {
        const email = event.target.getAttribute('data-email');
        document.querySelector('.login-container input[type="email"]').value = email;
        // Optionally, set the password too if you want
    }
});
