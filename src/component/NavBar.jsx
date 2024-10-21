import React from 'react'
import '../css/NavBar.css'
import { useState, useEffect, useContext } from 'react'
import { LoginContext } from '../variable/LoginContext'
import { db } from '../backend/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const { loginID, setLoginID, setIsLogin } = useContext(LoginContext);
    const [ profileData, setProfileData ] = useState({}); // State for profile data
    const navigate = useNavigate();

    // fetch profile data from loginID
    useEffect(() => {
        const fetchProfileData = async () => {
            const userCollection = collection(db, 'user_data');
            const userSnapshot = await getDocs(userCollection);
            userSnapshot.forEach(doc => {
                if (doc.id === loginID) {
                    setProfileData(doc.data());
                }
            });
        };
        fetchProfileData();
    }, [loginID]);

    // logout
    function handleLogout() {
        setLoginID(null);
        localStorage.removeItem('loginID');
        setIsLogin(false);
        alert('You are successfully logged out');
        navigate('/');
    }

    return (
        <header className="navbar">

            <button className="back" onClick={() => navigate(-1)}>
                <img src="https://img.icons8.com/parakeet-line/48/FFFFFF/circled-left.png" alt="Back-arrow" className="back-arrow" />
            </button>

            <nav className="nav-center">
                    <button className="nav-button" onClick={() => window.location.href = `/search/find`}>Search</button>
                    <button className="nav-button" onClick={() => window.location.href = `/message/chat`}>Message</button>
                    <a href='/' className="icon" onClick={() => window.location.href = `/search/find`}>
                        <img src="https://img.icons8.com/ios-glyphs/30/cat--v1.png" alt="Feed-icon" className="feed-icon" />
                    </a>
                    <button className="nav-button" onClick={() => window.location.href = `/${loginID}`}>
                        <img src={profileData.profile_pic}
                        alt="My Profile Picture"
                        style={{
                            width: '23px',
                            height: '23px',
                            borderRadius: '50%',
                            marginRight: '10px'
                        }} />
                        My Profile
                        </button>
                    <button className="nav-button" onClick={handleLogout}>Log Out</button>
            </nav>
            {/* <div className="nav-right">
            </div> */}
        </header>

    )
}

export default NavBar;