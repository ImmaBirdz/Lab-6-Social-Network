import React from 'react'
import { useEffect, useContext } from 'react'
import '../css/Login.css'
import { TabTitle } from './TabTitle'
import { db, storage } from '../backend/firebaseConfig'
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage'
import { LoginContext } from '../variable/LoginContext';

const Login = () => {

    const {isLogin, setIsLogin, setLoginID, isLoaded} = useContext(LoginContext);

    useEffect(() => {
        if (isLogin) {
            // Navigate to the profile page after login state is set
            window.location.href = "/page";
        }
    }, [isLogin]);

    // Trigger panel switching for registration and login
    useEffect(() => {
        if (!isLoaded) return;
        TabTitle("Sign in | Black Cat with Bow");
        dynamicTitle();

        const registerButton = document.getElementById("register");
        const loginButton = document.getElementById("login");
        const container = document.getElementById("licontainer");
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
    }, [isLoaded]);

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
            let found = false;
            const fetchData = async () => {
                const querySnapshot = await getDocs(collection(db, 'user_data'));
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.email === email && data.password === password) {
                        found = true;
                        setIsLogin(true);
                        setLoginID(doc.id);
                        localStorage.setItem('loginID', doc.id); // add loginID to localStorage
                        alert('Login successful');
                    }
                });
                if (!found) {
                    alert('Email or password is incorrect');
                }
            }
            fetchData();
        }
        else {
            alert('Please fill in all fields.');
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const birthday = document.getElementById("birthday").value;
        const gender = document.getElementById("gender").value;
        // get default profile picture from firebase storage
        const defaultProfilePicRef = ref(storage, 'default_profile.jpg');
        const defaultProfilePic = await getDownloadURL(defaultProfilePicRef);
        
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        
        if (username && email && password && birthday && gender) {
            const payload = {
                username: username,
                display_name: username,
                email: email,
                password: password,
                birthday: birthday,
                gender: gender,
                bio : "This is a bio",
                profile_pic : defaultProfilePic
            };
            // check if some data is already in the database
            let isDuplicate = false;

            const fetchData = async () => {
                const querySnapshot = await getDocs(collection(db, 'user_data'));
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.username === username) {
                        alert('Username is already in use');
                        isDuplicate = true;
                        // reset the fields
                        document.getElementById("username").value = "";
                        return;
                    }
                    if (data.email === email) {
                        alert('Email is already in use');
                        isDuplicate = true;
                        // reset the fields
                        document.getElementById("email").value = "";
                        return;
                    }
                });
            }
            fetchData();
            // if it is not a duplicate, add the data to the database
            if (!isDuplicate) {
                // fetch the user_data collection
                fetchData();

                // Add a new document with a generated id.
                const userDoc = doc(db, 'user_data', username);
                const userPayload = {
                    ...payload,
                    number_of_friends: 0,
                    number_of_posts: 0
                    // Add more fields here
                }
                // set the document
                setDoc(userDoc, userPayload);
                alert("Registration successful.");
                
                // delete input fields
                document.getElementById("username").value = "";
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                document.getElementById("confirmPassword").value = "";
                document.getElementById("birthday").value = "";
                document.getElementById("gender").value = "";

                // ge back to login
                document.getElementById("login").click();
            }
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <body>
        {/* ++logo */}
        <div className="licontainer" id="licontainer">
            <div className="form-container register-container">
                <form action="#" onSubmit={handleRegisterSubmit}>
                    <h1>Register here.</h1>
                    <input type="text" id="username" placeholder="Username" required pattern='^[a-z0-9._]+$' title='Username must contain only lowercase letters, numbers, and _ .'/>
                    <input type="email" id="email" placeholder="Email" required />
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
                        <option value="Shuuuuuuu">Don't wanna tell...</option>
                        <option value="Other" />
                    </datalist>
                    <button type='submit'>Register</button>
                </form>
            </div>
    
            <div className="form-container login-container">
                <form action="#" onSubmit={handleLoginSubmit}>
                    <h1>Login here.</h1>
                    <input type="email" id="email" name="email" placeholder="Email" />
                    <input type="password" id="password" name="password" placeholder="Password" />
                    <div className="content">
                        <div className='forget-password' onClick={() => alert("Don't ask us, ask yourself...")}><a href="#">Forgot password?</a></div>
                    </div>
                    <button type='submit'>Login</button>
                    <span>or use your account</span>
    
                    {/* add social link */}
                    <div className="social-container">
                        <div className="social-links">
                            <a href="#" className="social-button-google" onClick={() => alert("We don't pay for it...")}>
                                <img src="https://pngimg.com/d/google_PNG19635.png" alt="Google" />
                            </a>
                            <a href="#" className="social-button-facebook" onClick={() => alert("We don't pay for it...")}>
                                <img src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png" alt="Facebook" />
                            </a>
                            <a href="#" className="social-button-instagram" onClick={() => alert("We don't pay for it...")}>
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
                        <p>If you have an account, Login here</p>
                        <button className="ghost" id="login" onChange={dynamicTitle}>Login
                            <i className="Ini Ini-arrow-left login"></i>
                        </button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1 className="title">Start your <br /> journey</h1>
                        <p>If you don't have an account yet, why not have one?</p>
                        <button className="ghost" id="register" onChange={dynamicTitle}>Register
                            <i className="Ini Ini-arrow-right register"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </body>
    )
}

export default Login;