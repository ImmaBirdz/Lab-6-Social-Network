import React from 'react'
import '../css/Page.css'

const NavBar = () => {
    return (
        <header className="navbar">
                <button className="back" onClick={() => window.location.href = 'http://localhost:3000/page'}>
                    <img src="https://img.icons8.com/parakeet-line/48/FFFFFF/circled-left.png" alt="Back-arrow" className="back-arrow" />
                </button>

                <nav className="nav-center">
                    <img src="https://img.icons8.com/ios-glyphs/30/cat--v1.png" alt="Feed-icon" className="feed-icon" />
                </nav>

                <div className="nav-right">
                    <button className="nav-button" onClick={() => window.location.href = 'http://localhost:3000/page'}>
                        Page
                    </button>
                    <button className="nav-button" onClick={() => window.location.href = 'http://localhost:3000/message'}>
                        Message
                    </button>
                    <button className="nav-button" onClick={() => window.location.href = 'http://localhost:3000/profile'}>
                        Profile
                    </button>
                    <button className="nav-button" onClick={() => window.location.href = 'http://localhost:3000'}>
                        Log Out
                    </button>
                </div>
            </header>
    )
}

export default NavBar;