import React, { useState, useEffect } from 'react';
import '../css/Post.css';  // Separate CSS for styling posts
import SideBarRight from './SideBarRight';
import { TabTitle } from './TabTitle';

const Post = () => {

    const [isSidebarShown, setSidebarShow] = useState(false);

    const toggleSidebar = () => {
        setSidebarShow(!isSidebarShown);
    };

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

            <div className="main-Content">

                <button className="toggle-sidebar-right" onClick={toggleSidebar}>
                    {isSidebarShown ? '✖' : '☰'}
                </button>

                <SideBarRight isSidebarShown={isSidebarShown} />

                <div className="container">

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

                </div>

            </div>

    );
};

export default Post;
