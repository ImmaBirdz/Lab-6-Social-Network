import React from 'react'
import { useEffect } from 'react'

const Login = () => {
    // Trigger panel switching for registration and login
    useEffect(() => {
        const registerButton = document.getElementById("register");
        const loginButton = document.getElementById("login");
        const container = document.getElementById("container");

        const handleRegisterClick = () => {
            container.classList.add("right-panel-active");
        };

        const handleLoginClick = () => {
            container.classList.remove("right-panel-active");
        };

        const handleTransitionEnd = () => {
            const activeForm = document.querySelector(".form-container:not(.right-panel-active)");
            if (activeForm) {
                const inputs = activeForm.querySelectorAll("input");
            }
        };

        registerButton.addEventListener("click", handleRegisterClick);
        loginButton.addEventListener("click", handleLoginClick);
        container.addEventListener("transitionend", handleTransitionEnd);

        return () => {
            registerButton.removeEventListener("click", handleRegisterClick);
            loginButton.removeEventListener("click", handleLoginClick);
            container.removeEventListener("transitionend", handleTransitionEnd);
        };
    }, []);

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (email && password) {
            // saveRecentLogin(email, "XXXX"); // Replace XXXX with actual user name logic
            window.location.href = "page.html"; // Navigate to the page
        } else {
            alert('Please fill in both email and password.');
        }
    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value; // error here | .value
        console.log("Registering..."); // debug
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
        const birthday = event.target.birthday.value;
        const gender = event.target.gender.value;
        
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        
        if (name && email && password && birthday && gender) {
            // saveRecentLogin(email, name);
            window.location.href = "profile.html"; // Navigate to the profile
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <body>
        {/* ++logo */}
        <h1 className="falling-hello" id="falling-hello">Hello</h1>
        <div className="container" id="container">
            <div className="form-container register-container">
                <form action="#">
                    <h1>Register here.</h1>
                    <input type="text" placeholder="Name" required />
                    <input type="email" placeholder="Email or phone number" required />
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                        required
                        pattern="(?=.*\d)(?=.*[A-Z]).{8,}" 
                        title="Password must be at least 8 characters long, contain at least one uppercase letter, and one number" 
                    />
                    {/* confirm pass, gender and birthday */}
                    <input type="password" placeholder="Confirm Password" required /> 
                    <input type="date" placeholder="Birthday" required />
                    <input type="text" placeholder="Gender" list="gender-options" required />
                    <datalist id="gender-options">
                        <option value="Male" />
                        <option value="Female" />
                        <option value="God" />
                        <option value="Unicon" />
                        <option value="Thai">I am Thai and Thai means Freedom...</option>
                        <option value="Suuuuuuu">Don't wanna tell...</option>
                        <option value="Other" />
                    </datalist>
                    <button onClick={handleRegisterSubmit}>Register</button>
                </form>
            </div>
    
            <div className="form-container login-container">
                <form action="#">
                    <h1>Login here.</h1>
                    <input type="email" name="email" placeholder="Email or phone number" />
                    <input type="password" name="password" placeholder="Password" />
                    <div className="content">
                        {/* remember me เผื่ออนาคตได้ใช้ */}
    
                        {/* <div className="checkbox">
                            <input type="checkbox" name="checkbox" id="checkbox" />
                            <label>Remember me</label>
                        </div> */}
                        <div className="pass-link"> 
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>
                    <button onClick={handleLoginSubmit}>Login</button>
                    <span>or use your account</span>
    
                    {/* add social link */}
                    <div className="social-container">
                        <div className="social-links">
                            <a href="#" className="social-button-google">
                                <img src="https://pngimg.com/d/google_PNG19635.png" alt="Google" />
                            </a>
                            <a href="#" className="social-button-facebook">
                                <img src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png" alt="Facebook" />
                            </a>
                            <a href="#" className="social-button-instagram">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png" alt="Instagram" />
                            </a>
                        </div>
                    </div>
                </form>
            </div>
    
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1 className="title">Hello <br />There</h1>
                        <p>if you have an account, login here</p>
                        <button className="ghost" id="login">Login
                            <i className="Ini Ini-arrow-left login"></i>
                        </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 className="title">Start your <br /> journey</h1>
                        <p>if you don't have an account yet why not have one?</p>
                        <button className="ghost" id="register">Register
                            <i className="Ini Ini-arrow-right register"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
        <div className="recent-login-box">
            <h2>Recent Login.</h2>
            <div className="recent-user">
                {/* this img should be path link to recent user png */}
                <img src="https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k" alt="User Picture" className="user-pic" />
                <p className="user-name">เสี่ยโต๋</p>
            </div>
    
            {/* link to recent user name */}
            <button className="fast-login">Login as เสี่ยโต๋</button>
        </div>
    
        {/* don no yet what this box for but it should be sth to balance the page */}
        <div className="about-us-box">
            <h2>About Us.</h2>
            <p>hello this is our web project.....</p>
        </div>
        <script src="scriptLogin.js"></script>
    </body>
    )
}

export default Login;