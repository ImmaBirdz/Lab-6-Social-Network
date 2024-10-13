import React from 'react'
import '../css/Page.css'
import { useContext } from 'react'
import { LoginContext } from '../variable/LoginContext'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const { loginID, setLoginID, setIsLogin } = useContext(LoginContext);
    const navigate = useNavigate();

    // logout
    function handleLogout(){
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
                    <img src="https://img.icons8.com/ios-glyphs/30/cat--v1.png" alt="Feed-icon" className="feed-icon" />
                </nav>

                <div className="nav-right">
                    <Link to='/page'>
                        <button className="nav-button">Page</button>
                    </Link>
                        
                    <Link to='/message'>
                        <button className="nav-button">Message</button>
                    </Link>
                    
                    <Link to={`/profile/${loginID}`}>
                        <button className="nav-button">Your Profile</button>
                    </Link>

                    <button className="nav-button" onClick={handleLogout}>Log Out</button>
                </div>
            </header>
    )
}

export default NavBar;