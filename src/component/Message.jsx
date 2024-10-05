import React, { useState, useRef, useEffect } from 'react';
import '../css/Message.css';
import { TabTitle } from './TabTitle';

const Message = () => {
    const [selectedFriend, setSelectedFriend] = useState({
        name: 'User Name',
        imgSrc: 'https://via.placeholder.com/40',
    });

    const [chats, setChats] = useState({
        chat1: [
            { from: 'friend', text: "Hi! this is friend 1 message" },
            { from: 'friend', text: "How are you" },
            { from: 'me', text: "I'm good, thanks! How about you?" },
        ],
        chat2: [
            { from: 'friend', text: "Hi! this is friend 2 message" },
            { from: 'friend', text: "Do u have girlfriend/boyfriend ?" },
            { from: 'me', text: "........." },
        ],
        chat3: [
            { from: 'friend', text: "Hi! this is friend 3 message" },
            { from: 'friend', text: "เที่ยงนี้กินไรดี" },
            { from: 'me', text: "ส้มตำจร้า...." },
        ],
        chat4: [
            { from: 'friend', text: "Hi! this is friend 4 message" },
            { from: 'friend', text: "who r u ?" },
            { from: 'me', text: "I'm your.... father" },
        ],
        chat5: [
            { from: 'friend', text: "Hi! this is friend 5 message" },
            { from: 'friend', text: "How are you" },
            { from: 'me', text: "I'm good, thanks! How about you?" },
        ],
        chat6: [
            { from: 'friend', text: "Hi! this is friend 6 message" },
            { from: 'friend', text: "How are you" },
            { from: 'me', text: "I'm good, thanks! How about you?" },
        ],
        chat7: [
            { from: 'friend', text: "Hi! this is friend 7 message" },
            { from: 'friend', text: "How are you" },
            { from: 'me', text: "I'm good, thanks! How about you?" },
        ],
        chat8: [
            { from: 'friend', text: "Hi! this is friend 8 message" },
            { from: 'friend', text: "How are you" },
            { from: 'me', text: "I'm good, thanks! How about you?" },
        ],
        chat9: [
            { from: 'friend', text: "Hi! this is friend 9 message" },
            { from: 'friend', text: "How are you" },
            { from: 'me', text: "I'm good, thanks! How about you?" },
        ],
        
    });

    const [currentChat, setCurrentChat] = useState('chat1');
    const [inputMessage, setInputMessage] = useState('');

    const friends = [
        { id: 'chat1', name: 'Friend 1', imgSrc: 'https://via.placeholder.com/40' },
        { id: 'chat2', name: 'Friend 2', imgSrc: 'https://via.placeholder.com/40' },
        { id: 'chat3', name: 'Friend 3', imgSrc: 'https://via.placeholder.com/40' },
        { id: 'chat4', name: 'Friend 4', imgSrc: 'https://via.placeholder.com/40' },
        { id: 'chat5', name: 'Friend 5', imgSrc: 'https://via.placeholder.com/40' },
        { id: 'chat6', name: 'Friend 6', imgSrc: 'https://via.placeholder.com/40' },
        { id: 'chat7', name: 'Friend 7', imgSrc: 'https://via.placeholder.com/40' },
        { id: 'chat8', name: 'Friend 8', imgSrc: 'https://via.placeholder.com/40' },
        { id: 'chat9', name: 'Friend 9', imgSrc: 'https://via.placeholder.com/40' },
    ];

    const chatEndRef = useRef(null); // Reference for scrolling

    const openChat = (chatId, friend) => {
        setCurrentChat(chatId);
        setSelectedFriend(friend);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim()) {
            setChats(prevChats => ({
                ...prevChats,
                [currentChat]: [...prevChats[currentChat], { from: 'me', text: inputMessage }]
            }));
            setInputMessage(''); // Clear the input after sending
        }
    };

    // Scroll to the bottom of the chat whenever a new message is added ...idk why it not work  give up anyway
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chats[currentChat]]); 


    return (
        <div>   

            {/* Top Navbar */}
            <header className="navbar">

                {/* link back to page */}
                <button className="back" onClick={() => window.location.href = 'http://localhost:3000/page'}>
                    <img src="https://img.icons8.com/parakeet-line/48/FFFFFF/circled-left.png" alt="Back-arrow" className="back-arrow" />
                </button>

                <nav className="nav-center">
                    <img src="https://img.icons8.com/ios-filled/50/FFFFFF/chat.png" alt="Message-icon" className="message-icon" />
                </nav>
            </header>

            <div className="container">

                {/* Left Sidebar (Friends List) */}
                <aside className="sidebar-left">
                    <ul>
                        {friends.map(friend => (
                            <li key={friend.id} onClick={() => openChat(friend.id, friend)}>
                                <img src={friend.imgSrc} alt={friend.name} className="profile-pic" />
                                <span>{friend.name}</span>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Chat Area (Middle Section) */}
                <main className="feed">

                    {/* Msg Header Section */}
                    <div className="msg-header">
                        <div className="container1">
                            <img src={selectedFriend.imgSrc} className="msgimg" alt={selectedFriend.name} />
                            <div className="active">
                                <p>{selectedFriend.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Inbox */}
                    <div className="chat-page">
                        <div className="msg-inbox">
                            <div className="chats">

                                {/* Message Container */}
                                <div className="msg-page">
                                    {chats[currentChat].map((msg, index) => (
                                        <div key={index} className={msg.from === 'me' ? 'my-message' : 'friend-message'}>
                                            <p className="message">{msg.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Msg Bottom Section */}
                            <div className="msg-bottom">
                                <button className="send">
                                    <img src="https://img.icons8.com/dotty/80/filled-sent.png" alt="Send-arrow" className="send-arrow" />
                                </button>
                                <div className="input-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Write message..." 
                                        value={inputMessage} 
                                        onChange={(e) => setInputMessage(e.target.value)} 
                                        onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage() }}
                                    />
                                    <span className="input-group-text send-icon" onClick={handleSendMessage}>
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
