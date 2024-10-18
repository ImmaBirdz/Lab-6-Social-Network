import React, { useState, useEffect, useContext } from 'react';
import '../css/Post.css';  // Separate CSS for styling posts
import SideBarRight from './SideBarRight';
import { TabTitle } from './TabTitle';
import { LoginContext } from '../variable/LoginContext';
import { db } from '../backend/firebaseConfig';
import { collection, getDocs, serverTimestamp } from 'firebase/firestore';

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

    const { postID } = useContext(LoginContext);
    const { profileID, setProfileID } = useContext(LoginContext);
    const [postData, setPostData] = useState({}); // State for post data
    const [profileData, setProfileData] = useState({}); // State for profile data
    const [commentData, setCommentData] = useState({}); // State for comment data
    master

    useEffect(() => {
        TabTitle('Posts | Black Cat with Bow');
    }, []);

    // set profileID from profileData
    useEffect(() => {
        if (profileData.username) {
            setProfileID(profileData.username);
        }
    }, [profileData]);

    // set commentData from postData
    useEffect(() => {

        if (commentData === null) {
            setCommentData(commentData);
            console.log(commentData);
        }
    }, []);

    useEffect(() => {
        // Fetch post data from the database
        const fetchPostData = async () => {
            const postCollection = collection(db, 'post');
            const postSnapshot = await getDocs(postCollection);
            postSnapshot.forEach(doc => {
                if (doc.id === postID) {
                    setPostData(doc.data());
                    // fetch comment data from post data
                    fetchCommentData();
                }
            });
        }
        fetchPostData();
        // fetch profile data from post data
        const fetchProfileData = async () => {
            const userCollection = collection(db, 'user_data');
            const userSnapshot = await getDocs(userCollection);
            userSnapshot.forEach(doc => {
                if (doc.id === postData.user_id) {
                    setProfileData(doc.data());
                }
            });
        }
        fetchProfileData();

        // fetch comment data from post data
        const fetchCommentData = async () => {
            const commentCollection = collection(db, 'comment');
            const commentSnapshot = await getDocs(commentCollection);
            commentSnapshot.forEach(doc => {
                if (doc.id === postData.comments) {
                    setCommentData(doc.data());
                }
            });
        }
        fetchCommentData();
        console.log(commentData);

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

        <div className="main-Content">

            <button className="toggle-sidebar-right" onClick={toggleSidebar}>
                {isSidebarShown ? '✖' : '☰'}
            </button>

            <div className={`sidebar-right ${isSidebarShown ? 'show' : ''}`}>
                <SideBarRight isSidebarShown={isSidebarShown} />
            </div>


            <div className={`container ${isSidebarShown ? 'shifted' : ''}`}>

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

                                <div>
                                    <div className="container">
                                        <main className="feed">
                                            <div className="postBox">
                                                <div className="postedContent">
                                                    <div className="userProf">
                                                        <a href="#">
                                                            <div className="userPics">
                                                                <img style={{
                                                                    backgroundImage: `url(${profileData.profile_pic})`,
                                                                    backgroundSize: '65px 65px',
                                                                }} />
                                                            </div>
                                                        </a>
                                                        <div>
                                                            <div className="infoPost">
                                                                <span className='postDisplayName' onClick={() => window.location.href = `/${profileID}`}><b><a>{profileData.display_name}</a></b></span>
                                                                <span className='postUsername' onClick={() => window.location.href = `/${profileID}`}>{`@${postData.user_id}`}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="postText">{postData.input}</p>
                                                <div className="postAction">
                                                    <div className="activitiesIcons">
                                                        <ion-icon name="heart-outline"></ion-icon>
                                                        <a href="#"></a><span className="iconAct">comment <ion-icon name="chatbox-outline" /></span>
                                                        <a href="#"><span className="iconAct">repost <ion-icon name="repeat-outline" /></span></a>
                                                    </div>
                                                </div>
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

                                                        </div> ))}

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

                                )

        

                                
};
                                export default Post;