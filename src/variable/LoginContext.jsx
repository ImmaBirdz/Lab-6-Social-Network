import { createContext, useState, useEffect } from 'react';

const LoginContext = createContext();

const LoginProvider = (props) => {
    const [registerButton, setRegisterButton] = useState(false);
    const [loginButton, setLoginButton] = useState(false);
    const [container, setContainer] = useState(false);
    const [hello, setHello] = useState(false);

    useEffect(() => {
        // Falling animation and recent logins display
        setTimeout(() => {
            document.getElementById('falling-hello').classList.add('animate'); // Falling animation
            // displayRecentLogins(); // Display recent logins
        }, 500);
    
        // Slide-in animations for boxes
        const recentLoginBox = document.querySelector('.recent-login-box');
        const aboutUsBox = document.querySelector('.about-us-box');
    
        setTimeout(() => {
            recentLoginBox.classList.add('slide-in-right');
        }, 1000);
    
        setTimeout(() => {
            aboutUsBox.classList.add('slide-in-right');
        }, 1200);
    
        // Load recent logins from localStorage
        // displayRecentLogins();
    
        }, []);
    
        
    
        // const saveRecentLogin = (email, name) => {
        //     let logins = JSON.parse(localStorage.getItem('recentLogins')) || [];
        //     logins = logins.filter(login => login.email !== email);
        //     logins.unshift({ email, name });
        //     if (logins.length > 5) logins.pop();
        //     localStorage.setItem('recentLogins', JSON.stringify(logins));
        //     setRecentLogins(logins);
        // };
    
        // const displayRecentLogins = () => {
        //     const logins = JSON.parse(localStorage.getItem('recentLogins')) || [];
        //     setRecentLogins(logins);
        // };
    
        // const handleFastLogin = (email) => {
        //     document.querySelector('.login-container input[type="email"]').value = email;
        //     // Set password if applicable
        // };

    return (
        <LoginContext.Provider value={[
            registerButton,
            setRegisterButton,
            loginButton,
            setLoginButton,
            container,
            setContainer,
            hello,
            setHello
            ]}>
            {props.children}
        </LoginContext.Provider>
    )
}

export { LoginContext, LoginProvider };