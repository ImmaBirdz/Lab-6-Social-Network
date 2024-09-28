const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");
const hello = document.getElementById('falling-hello');

// Trigger panel switching for registration and login
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


window.onload = function() {
    setTimeout(function() {
        hello.classList.add('animate');  // Falling animation
        displayRecentLogins();           // Display recent logins
    }, 500); 

    // animations for recent-login-box and about-us-box
    const recentLoginBox = document.querySelector('.recent-login-box');
    const aboutUsBox = document.querySelector('.about-us-box');

    // classes moving animation
    setTimeout(() => {
        recentLoginBox.classList.add('slide-in-right');  
    }, 1000);  

    setTimeout(() => {
        aboutUsBox.classList.add('slide-in-right');      
    }, 1200);  
};

// login 
document.querySelector('.login-container form').addEventListener('submit', (event) => {
    event.preventDefault(); 
    const email = document.querySelector('.login-container input[type="email"]').value;
    const password = document.querySelector('.login-container input[type="password"]').value;

    if (email && password) {
        saveRecentLogin(email, "XXXX"); 
        window.location.href = "page.html"; 
    } else {
        alert('Please fill in both email and password.');
    }
});

// regis
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
        saveRecentLogin(email, name);
        window.location.href = "profile.html"; 
    } else {
        alert('Please fill in all fields.');
    }
});


// stil have a prob with local Storage idk adk chat gpt instead

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

// Quick login / recent login
document.querySelector('.recent-login-box').addEventListener('click', (event) => {
    if (event.target.classList.contains('fast-login')) {
        const email = event.target.getAttribute('data-email');
        document.querySelector('.login-container input[type="email"]').value = email;


        
        // set the password 
    }
});
