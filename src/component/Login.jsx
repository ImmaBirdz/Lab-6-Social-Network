import React from 'react'
import { useEffect } from 'react'
import '../css/Login.css'
import { TabTitle } from './TabTitle'
import { db } from '../backend/firebaseConfig'
import { addDoc, collection, getDocs } from 'firebase/firestore';

const Login = () => {
    // Trigger panel switching for registration and login
    useEffect(() => {
        const registerButton = document.getElementById("register");
        const loginButton = document.getElementById("login");
        const container = document.getElementById("esus");
        document.title = "Sign in | Black Cat with Bow";

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

    // Change the title of the page when the user switches between login and register
    useEffect(() => {
        TabTitle("Sign in | Black Cat with Bow");
        dynamicTitle();
    },[]);

    const dynamicTitle = () => {
        let registerButtonTitle = document.getElementById('register');
        let loginButtonTitle = document.getElementById('login');

        registerButtonTitle.addEventListener('click', () => {
            document.title = "Sign up | Black Cat with Bow";
        });

        loginButtonTitle.addEventListener('click', () => {
            document.title = "Sign in | Black Cat with Bow";
        });
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (email && password) {
            // saveRecentLogin(email, "XXXX"); // Replace XXXX with actual user name logic
            let found = false; // flag to check if email and password match in the database
            getDocs(collection(db, "user_data")).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.email === email && data.password === password && !found) {
                        found = true;
                        // delete input fields
                        document.getElementById("email").value = "";
                        document.getElementById("password").value = "";
                        window.location.href = "profile"; // Navigate to the profile
                    }
                });
                if (!found) {
                    alert("Email or password is incorrect.");
                }
            });
        }
        else {
            alert('Please fill in all fields.');
        }

    };

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const birthday = document.getElementById("birthday").value;
        const gender = document.getElementById("gender").value;
        
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        
        if (name && email && password && birthday && gender) {
            // saveRecentLogin(email, name);
            const payload = {
                name: name,
                display_name: name,
                email: email,
                password: password,
                birthday: birthday,
                gender: gender
            };
            // check if some data is already in the database
            let isDuplicate = false;
            getDocs(collection(db, "user_data")).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    // check if the name is already in use
                    if (data.name === name) {
                        alert("Name is already in use.");
                        isDuplicate = true;
                        // reset the fields
                        document.getElementById("name").value = "";
                        return;
                    }
                    // check if the email is already in use
                    else if (data.email === email) {
                        alert("Email is already in use.");
                        isDuplicate = true;
                        // reset the fields
                        document.getElementById("email").value = "";
                        document.getElementById("password").value = "";
                        document.getElementById("confirmPassword").value = "";
                        return;
                    }
                    // if it is not a duplicate, add the data to the database
                    if (!isDuplicate) {
                        console.log("Email is not in use.");
                        // Add a new document with a generated id.
                        addDoc(collection(db, "user_data"), {
                            ...payload,
                            number_of_friends: 0,
                            number_of_posts: 0
                            // Add more fields here
                        });
                        console.log(payload + " is added to the database.");
                        // delete input fields
                        document.getElementById("name").value = "";
                        document.getElementById("email").value = "";
                        document.getElementById("password").value = "";
                        document.getElementById("confirmPassword").value = "";
                        document.getElementById("birthday").value = "";
                        document.getElementById("gender").value = "";
                        console.log("Redirecting to profile...");
                        // Navigate to the profile
                        window.location.href = "profile"; 
                    }
                });
            });
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <body>
        {/* ++logo */}
        <div className="licontainer" id="esus">
            <div className="form-container register-container">
                <form action="#" onSubmit={handleRegisterSubmit}>
                    <h1>Register here.</h1>
                    <input type="text" id="name" placeholder="Name" required />
                    <input type="email" id="email" placeholder="Email or phone number" required />
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Password" 
                        required
                        pattern="(?=.*\d)(?=.*[A-Z]).{8,}" 
                        title="Password must be at least 8 characters long, contain at least one uppercase letter, and one number" 
                    />
                    {/* confirm pass, gender and birthday */}
                    <input type="password" id="confirmPassword" placeholder="Confirm Password" required /> 
                    <input type="date" id="birthday" placeholder="Birthday" required />
                    <input type="text" id="gender" placeholder="Gender" list="gender-options" required />
                    <datalist id="gender-options">
                        <option value="Male" />
                        <option value="Female" />
                        <option value="Gay">pls tell me if you Gay</option>
                        <option value="LGBTQ A+" />
                        <option value="Unicon" />
                        <option value="Thai">I am Thai and Thai means Freedom...</option>
                        <option value="Suuuuuuu">Don't wanna tell...</option>
                        <option value="Other" />
                    </datalist>
                    <button type='submit'>Register</button>
                </form>
            </div>
    
            <div className="form-container login-container">
                <form action="#" onSubmit={handleLoginSubmit}>
                    <h1>Login here.</h1>
                    <input type="email" id="email" name="email" placeholder="Email or phone number" />
                    <input type="password" id="password" name="password" placeholder="Password" />
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
                    <button type='submit'>Login</button>
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
                        <button className="ghost" id="login" onChange={dynamicTitle}>Login
                            <i className="Ini Ini-arrow-left login"></i>
                        </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 className="title">Start your <br /> journey</h1>
                        <p>if you don't have an account yet why not have one?</p>
                        <button className="ghost" id="register" onChange={dynamicTitle}>Register
                            <i className="Ini Ini-arrow-right register"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
        {/* <div className="recent-login-box">
            <h2>Recent Login.</h2>
            <div className="recent-user">
                
                <img src="https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k" alt="User Picture" className="user-pic" />
                <p className="user-name">เสี่ยโต๋</p>
            </div>
    
            
            <button className="fast-login">Login as เสี่ยโต๋</button>
        </div>
    
        
        <div className="about-us-box">
            <h2>About Us.</h2>
            <p>hello this is our web project.....</p>
        </div> */}
    </body>
    )
}

export default Login;