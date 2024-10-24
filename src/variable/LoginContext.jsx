import { createContext, useState, useEffect } from 'react';
import { db } from '../backend/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const LoginContext = createContext();

const LoginProvider = (props) => {
    const [registerButton, setRegisterButton] = useState(false);
    const [loginButton, setLoginButton] = useState(false);
    const [container, setContainer] = useState(false);
    const [hello, setHello] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [loginID, setLoginID] = useState(null);
    const [profileID , setProfileID] = useState(null);
    const [postID, setPostID] = useState(null);
    const [contextProfileID, setContextProfileID] = useState([]);
    const [contextPostID, setContextPostID] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isPostSidebarShown, setIsPostSidebarShown] = useState(false);

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

    // fetch every profile id to contextProfileID
    useEffect(() => {
        const fetchProfileID = async () => {
            const userCollection = collection(db, 'user_data');
            const userSnapshot = await getDocs(userCollection);
            userSnapshot.forEach(doc => {
                setContextProfileID(contextProfileID => [...contextProfileID, doc.id]);
            });
        }
        fetchProfileID();
    }, []);

    // fetch every post id to contextPostID
    useEffect(() => {
        const fetchPostID = async () => {
            const postCollection = collection(db, 'post');
            const postSnapshot = await getDocs(postCollection);
            postSnapshot.forEach(doc => {
                setContextPostID(contextPostID => [...contextPostID, doc.id]);
            });
        }
        fetchPostID();
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
            profileID,
            setProfileID,
            postID,
            setPostID,
            contextProfileID,
            setContextProfileID,
            contextPostID,
            setContextPostID,
            isLoaded,
            setIsLoaded,
            isEditPostModalOpen,
            setIsEditPostModalOpen,
            isPostModalOpen,
            setIsPostModalOpen,
            isPostSidebarShown,
            setIsPostSidebarShown
        }}>
            {props.children}
        </LoginContext.Provider>
    )
}

export { LoginContext, LoginProvider };