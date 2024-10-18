import React from 'react'
import '../css/NavBar.css'
import { useContext } from 'react'
import { LoginContext } from '../variable/LoginContext'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
    const { loginID, setLoginID, setIsLogin } = useContext(LoginContext);
    const navigate = useNavigate();

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
                    <button className="nav-button" onClick={() => window.location.href = `/page`}>Page</button>
                    <button className="nav-button" onClick={() => window.location.href = `/message`}>Message</button>
                    <div className="icon"> <img src="https://img.icons8.com/ios-glyphs/30/cat--v1.png" alt="Feed-icon" className="feed-icon" /></div>
                    <button className="nav-button" onClick={() => window.location.href = `/${loginID}`}>My Profile</button>
                    <button className="nav-button" onClick={handleLogout}>Log Out</button>
            </nav>
            {/* <div className="nav-right">
            </div> */}
        </header>

    )
}

export default NavBar;