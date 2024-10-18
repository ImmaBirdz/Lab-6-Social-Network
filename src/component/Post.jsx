import React, { useState, useEffect, useContext } from 'react';
import '../css/Post.css';  // Separate CSS for styling posts
import { TabTitle } from './TabTitle';
import { LoginContext } from '../variable/LoginContext';
import { db } from '../backend/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Post = () => {
    const { postID, contextProfileID, contextPostID } = useContext(LoginContext);
    const [selectedFriend, setSelectedFriend] = useState({
        name: 'User ID',
        imgSrc: 'https://via.placeholder.com/40',
    });

    const [ postData, setPostData ] = useState({}); // State for post data


    const [postDate, setPostDate] = useState(new Date().toLocaleString()); // State for date and time

    useEffect(() => {
        TabTitle('Posts | Black Cat with Bow');
    }, []);

    useEffect(() => {
        // Fetch post data from the database
        const fetchPostData = async () => {
            const postCollection = collection(db, 'post');
            const postSnapshot = await getDocs(postCollection);
            postSnapshot.forEach(doc => {
                if (doc.id === postID) {
                    setPostData(doc.data());
                }
            });
        }
        fetchPostData();
        TabTitle(`Post from ${postData.user_id} | Black Cat with Bow`);
    }, [postID, postData.user_id]);

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
