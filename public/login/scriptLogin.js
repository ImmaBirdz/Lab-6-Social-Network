
const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

// Show regis
registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
});

loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
});

// Clear nputs 
container.addEventListener("transitionend", () => {
    const activeForm = document.querySelector(".form-container:not(.right-panel-active)");
    if (activeForm) {
        const inputs = activeForm.querySelectorAll("input");
        inputs.forEach(input => input.value = ""); 
    }
});

// Login 
document.querySelector('.login-container form').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const email = document.querySelector('.login-container input[type="email"]').value;
    const password = document.querySelector('.login-container input[type="password"]').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token); 
            window.location.href = "page.html"; 
        } else {
            alert('Invalid credentials');
            localStorage.removeItem('token');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
        localStorage.removeItem('token'); 
    }
});

// Regis
document.querySelector('.register-container form').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const name = document.querySelector('.register-container input[type="text"]').value;
    const email = document.querySelector('.register-container input[type="email"]').value;
    const password = document.querySelector('.register-container input[type="password"]').value;

    try {
        const response = await fetch('http://localhost:3000/register', {// node fix this later to store data
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            alert('Registration successful');
            container.classList.remove("right-panel-active"); // Switch to login form
        } else {
            alert('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during registration');
    }
});
