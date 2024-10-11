import React from 'react'
import '../css/Page.css'

const SideBarLeft = () => {
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