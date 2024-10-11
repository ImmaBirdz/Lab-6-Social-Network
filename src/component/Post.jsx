import React, { useState, useEffect } from 'react';
import '../css/Post.css';  // Separate CSS for styling posts
import { TabTitle } from './TabTitle';

const Post = () => {
    const [selectedFriend, setSelectedFriend] = useState({
        name: 'User ID',
        imgSrc: 'https://via.placeholder.com/40',
    });

    const [postDate, setPostDate] = useState(new Date().toLocaleString()); // State for date and time

    useEffect(() => {
        TabTitle('Posts | Black Cat with Bow');
    }, []);

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

    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([
        {
            id: 1,
            user: { name: 'Commenter 1', imgSrc: 'https://via.placeholder.com/30' },
            text: 'comment num 1 jaaa.',
        },
        {
            id: 2,
            user: { name: 'Commenter 2', imgSrc: 'https://via.placeholder.com/30' },
            text: 'comment num 2 jaaa.',
        },
    ]);

    const handleAddCommentClick = () => {
        setShowCommentInput(!showCommentInput);
    };

    const handleCommentSubmit = () => {
        if (commentText.trim() === '') return;

        const newComment = {
            id: comments.length + 1,
            user: { name: 'You', imgSrc: 'https://via.placeholder.com/30' },
            text: commentText,
        };

        setComments([...comments, newComment]);
        setCommentText('');
        setShowCommentInput(false);
    };

    return (
        <div>
            {/* Top Navbar */}
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

            <div className="container">
                {/* Left Sidebar (Friends List with Online Status) */}
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

              

                <main className="feed">
                    <div className="post">
                        {/* Post Author Information */}
                        <div className="post-header">
                            <img src={selectedFriend.imgSrc} alt="Post Author" className="profile-pic-large" />
                            <span>{selectedFriend.name}</span>
                        </div>

                        <p>This is the content of the post. hehehehehehehhehehehe.</p>
                        {/* Display Post Date and Time */}
                        <p className="post-date">{postDate}</p>
                    </div>

                    {/* Separator Line */}
                    <hr className="post-separator" />

                    <div className="comment-section">
                        <h4>Comments</h4>
                        {comments.map(comment => (
                            <div key={comment.id} className="comment">
                                <div className="comment-header">
                                    <img src={comment.user.imgSrc} alt="User Pic" className="profile-pic" />
                                    <h4>{comment.user.name}</h4>
                                </div>
                                <p>{comment.text}</p>
                            </div>
                        ))}

                        {/* Add Comment Button */}
                        <button className="add-comment-btn" onClick={handleAddCommentClick}>
                            {showCommentInput ? 'Cancel' : 'Add Comment'}
                        </button>

                        {/* Comment Input Field */}
                        {showCommentInput && (
                            <div className="comment-input">
                                <input
                                    type="text"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Write a comment..."
                                />
                                <button className="submit-comment-btn" onClick={handleCommentSubmit}>Submit</button>
                            </div>
                        )}
                    </div>
                </main>


                {/* Right Sidebar with Trending and Suggestions */}
                <aside className="sidebar-right">
                    <div className="trending-box">
                        <h4>Trending</h4>
                        <ul>
                            <li>Trend 1</li>
                            <li>Trend 2</li>
                            <li>Trend 3</li>
                        </ul>
                    </div>
                    <div className="suggestions-box">
                        <h4>Suggestions</h4>
                        <ul>
                            <li>Suggestion 1</li>
                            <li>Suggestion 2</li>
                            <li>Suggestion 3</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Post;
