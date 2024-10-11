import React from 'react'
import '../css/Page.css'
import { useContext } from 'react'
import { LoginContext } from '../variable/LoginContext'

const NavBar = () => {
    const { setLoginID, setIsLogin } = useContext(LoginContext);

    // logout
    function handleLogout(){
        setLoginID(null);
        localStorage.removeItem('loginID');
        setIsLogin(false);
        alert('You are successfully logged out');
        window.location.href = '/';
    }

    return (
        <header className="navbar">
                <button className="back" onClick={() => window.location.href = '/page'}>
                    <img src="https://img.icons8.com/parakeet-line/48/FFFFFF/circled-left.png" alt="Back-arrow" className="back-arrow" />
                </button>

                <nav className="nav-center">
                    <img src="https://img.icons8.com/ios-glyphs/30/cat--v1.png" alt="Feed-icon" className="feed-icon" />
                </nav>

                <div className="nav-right">
                    <button className="nav-button" onClick={() => window.location.href = '/page'}>
                        Page
                    </button>
                    <button className="nav-button" onClick={() => window.location.href = '/message'}>
                        Message
                    </button>
                    <button className="nav-button" onClick={() => window.location.href = '/profile'}>
                        Profile
                    </button>
                    <button className="nav-button" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>
            </header>
    )
}

export default NavBar;