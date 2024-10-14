import { createContext, useState, useEffect } from 'react';

const LoginContext = createContext();

const LoginProvider = (props) => {
    const [registerButton, setRegisterButton] = useState(false);
    const [loginButton, setLoginButton] = useState(false);
    const [container, setContainer] = useState(false);
    const [hello, setHello] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [loginID, setLoginID] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // check if the user is already login
    useEffect(() => {
        const loginID = localStorage.getItem('loginID');
        if (loginID) {
            setIsLogin(true);
            setLoginID(loginID);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        // Falling animation and recent logins display
        setTimeout(() => {
            const fallingHelloElement = document.getElementById('falling-hello');
            if (fallingHelloElement) {
                fallingHelloElement.classList.add('animate'); // Falling animation
            }
        }, 500);
    }, []);

    return (
        <LoginContext.Provider value={{
            registerButton,
            setRegisterButton,
            loginButton,
            setLoginButton,
            container,
            setContainer,
            hello,
            setHello,
            isLogin,
            setIsLogin,
            loginID,
            setLoginID,
            isLoaded,
            setIsLoaded
        }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export { LoginContext, LoginProvider };