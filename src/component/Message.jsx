import React from 'react'
import '../css/Message.css'
import { TabTitle } from './TabTitle'

const Message = () => {
    const openChat = (chatId) => {
        // Hide all chat boxes
        const chatBoxes = document.querySelectorAll('.chat-box');
        chatBoxes.forEach(chat => chat.style.display = 'none');

        // Show the selected chat box
        document.getElementById(chatId).style.display = 'block';
    };




    return (
        <div>   
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="Mesage.css" />
            </head>
            
            {/* Top Navbar */}
            <header className="navbar">
                <button className="back">
                    <img src="https://img.icons8.com/parakeet-line/48/FFFFFF/circled-left.png" alt="Back-arrow" className="back-arrow" />
                </button>
                
                <nav className="nav-center">
                    <img src="https://img.icons8.com/ios-filled/50/FFFFFF/chat.png" alt="Message-icon" className="message-icon" />
                </nav>
                
                <div className="menu-bar">
                    <button className="menu-toggle" onClick={() => document.getElementById('menu').classList.toggle('show')}>☰</button>
                    <div className="menu-content" id="menu">
                        <a href="#">Link 1</a>
                    </div>
                </div>
            </header>


            <div className="container">



                {/* Left Sidebar (Friends List) */}
                <aside className="sidebar-left">
                    <ul>
                        <li onClick={() => openChat('chat1')}>
                            <img src="https://via.placeholder.com/40" alt="Friend 1" className="profile-pic" />
                            <span>Friend 1</span>
                        </li>
                        <li onClick={() => openChat('chat2')}>
                            <img src="https://via.placeholder.com/40" alt="Friend 2" className="profile-pic" />
                            <span>Friend 2</span>
                        </li>
                        <li onClick={() => openChat('chat3')}>
                            <img src="https://via.placeholder.com/40" alt="Friend 3" className="profile-pic" />
                            <span>Friend 3</span>
                        </li>
                        <li onClick={() => openChat('chat4')}>
                            <img src="https://via.placeholder.com/40" alt="Friend 4" className="profile-pic" />
                            <span>Friend 4</span>
                        </li>
                        <li onClick={() => openChat('chat5')}>
                            <img src="https://via.placeholder.com/40" alt="Friend 5" className="profile-pic" />
                            <span>Friend 5</span>
                        </li>
                        
                    </ul>
            </aside>



{/* Chat Area (Middle Section) */}
<main className="feed">
                    {/* Msg Header Section */}
                    <div className="msg-header">
                        <div className="container1">
                            <img src="https://via.placeholder.com/40" className="msgimg" alt="User" />
                            <div className="active">
                                <p>User Name</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Chat Inbox */}
                    <div className="chat-page">
                        <div className="msg-inbox">
                            <div className="chats">
                                {/* Message Container */}
                                <div className="msg-page">
                                    {/* Chat 1 */}
                                    <div id="chat1" className="chat-box" style={{ display: 'none' }}>
                                        <h3>Chat with Friend 1</h3>
                                        <p>Hey! How's it going?</p>
                                        <p>I'm good, thanks! How about you?</p>
                                    </div>

                                    {/* Chat 2 */}
                                    <div id="chat2" className="chat-box" style={{ display: 'none' }}>
                                        <h3>Chat with Friend 2</h3>
                                        <p>Are you coming to the event?</p>
                                        <p>Yes, I'll be there!</p>
                                    </div>

                                    {/* Chat 3 */}
                                    <div id="chat3" className="chat-box" style={{ display: 'none' }}>
                                        <h3>Chat with Friend 3</h3>
                                        <p>Have you completed the project?</p>
                                        <p>Not yet, still working on it!</p>
                                    </div>

                                    {/* Add more chat boxes as needed */}
                                </div>
                            </div>

                            {/* Msg Bottom Section */}
                            <div className="msg-bottom">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Write message..." />
                                    <span className="input-group-text send-icon">
                                        <i className="bi bi-send"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Message;