import React from 'react'
import '../css/Page.css'
import { useState, useEffect } from 'react';

const SideBarLeft = () => {

    const [selectedFriend, setSelectedFriend] = useState({
        name: 'User Name',
        imgSrc: 'https://via.placeholder.com/40',
    });

    const [postDate, setPostDate] = useState(new Date().toLocaleString()); // State for date and time

    // Updated friends array with isOnline property
    const friends = [
        { id: 'chat1', name: 'Friend 1', imgSrc: 'https://via.placeholder.com/40', isOnline: true },
        { id: 'chat2', name: 'Friend 2', imgSrc: 'https://via.placeholder.com/40', isOnline: false },
        { id: 'chat3', name: 'Friend 3', imgSrc: 'https://via.placeholder.com/40', isOnline: true },
        { id: 'chat4', name: 'Friend 4', imgSrc: 'https://via.placeholder.com/40', isOnline: false },
        { id: 'chat5', name: 'Friend 5', imgSrc: 'https://via.placeholder.com/40', isOnline: true },
        { id: 'chat6', name: 'Friend 6', imgSrc: 'https://via.placeholder.com/40', isOnline: false },
        { id: 'chat7', name: 'Friend 7', imgSrc: 'https://via.placeholder.com/40', isOnline: true },
        { id: 'chat8', name: 'Friend 8', imgSrc: 'https://via.placeholder.com/40', isOnline: false },
        { id: 'chat9', name: 'Friend 9', imgSrc: 'https://via.placeholder.com/40', isOnline: true },
    ];

    const handleFriendClick = (friendId) => {
        // Link to that friend's message page that online, route based on their ID
        window.location.href = `/messages/${friendId}`;
    };

    return (
        <aside className="sidebar-left">
            <ul>
                {friends.map(friend => (
                    <li key={friend.id} onClick={() => handleFriendClick(friend.id)}>
                    <img src={friend.imgSrc} alt={friend.name} className="profile-pic" />
                    <span>{friend.name}</span>
                    {friend.isOnline && (
                        <img 
                            src="https://img.icons8.com/color-glass/48/cat.png" 
                            alt="Online" 
                            className="online-icon" 
                        />
                    )}
                </li>
                ))}
            </ul>
        </aside>
    )
}

export default SideBarLeft;