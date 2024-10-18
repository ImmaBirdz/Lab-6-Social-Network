import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../backend/firebaseConfig';
import '../css/Post.css'; // Separate CSS for styling posts
import { LoginContext } from '../variable/LoginContext';
import { TabTitle } from './TabTitle';

const Post = () => {
    const { postID, loginID } = useContext(LoginContext);
    const { profileID, setProfileID } = useContext(LoginContext);
    const [ postData, setPostData ] = useState({}); // State for post data
    const [ profileData, setProfileData ] = useState({}); // State for profile data
    const [ commentIdData, setCommentIdData ] = useState([]); // State for comment data
    const [ postInteractionData, setPostInteractionData ] = useState({}); // State for post interaction data
    const [ showCommentInput, setShowCommentInput ] = useState(false);
    const [ commentText, setCommentText ] = useState('');

        // fetch comment data from post data
        const fetchCommentIdData = async () => {
            try {
                if (!postID) {
                    return;
                }
        
                const commentCollection = collection(db, 'post', postID, 'comment');
                const commentSnapshot = await getDocs(commentCollection);
        
                if (commentSnapshot.empty) {
                    console.log('No comment data');
                    return;
                } else {
                    let commentsSet = new Set();
                    commentSnapshot.forEach(doc => {
                        commentsSet.add({ id: doc.id, ...doc.data() });
                    });
                    // convert set to array
                    const comments = Array.from(commentsSet);

                    //loop through comments to get user data
                    for (let i = 0; i < comments.length; i++) {
                        const userCollection = collection(db, 'user_data');
                        const userSnapshot = await getDocs(userCollection);
                        userSnapshot.forEach(doc => {
                            if (doc.id === comments[i].user_id) {
                                comments[i].user = doc.data();
                            }
                        });
                    }

                    // filter comment data by timestamp
                    comments.sort((a, b) => a.comment_time - b.comment_time);
                    return comments;
                }
            } catch (error) {
                console.error('Error fetching comments data:', error);
            }
        };
    
    // set profileID from profileData
    useEffect(() => {
        if (profileData.username) {
            setProfileID(profileData.username);
        }
    }, [profileData]);

    // set commentData from postData
    useEffect(() => {
        if (commentIdData) {
            setCommentIdData(commentIdData);
        }
    }, []);

    // fetch comment data from post data
    useEffect(() => {

        if(commentText.length > 0) return;
        
        async function load(){
            const comments = await fetchCommentIdData();
            if(comments) {
                setCommentIdData(comments);
            }
        }

        load();

    }, [commentText]);

    useEffect(() => {
        // Fetch post data from the database
        const fetchPostData = async () => {
            let postData = {};
            const postCollection = collection(db, 'post');
            const postSnapshot = await getDocs(postCollection);
            postSnapshot.forEach(doc => {
                if (doc.id === postID) {
                    setPostData(doc.data());
                    postData = doc.data();
                }
            });
            //add id to postData
            postData.id = postID;
            return postData;
        }

        // fetch profile data from post data
        const fetchProfileData = async (postData) => {
            const userCollection = collection(db, 'user_data');
            const userSnapshot = await getDocs(userCollection);
            userSnapshot.forEach(doc => {
                if (doc.id === postData.user_id) {
                    setProfileData(doc.data());
                    return doc.data();
                }
            });
        }

        const load = async () => {
            const comments = await fetchCommentIdData();
            if(comments) {
                setCommentIdData(comments);
            }
        }

        // fetch post interacion from post data
        const fetchPostInteractionData = async (postData) => {
            const postInteractionCollection = collection(db, 'user_data', loginID, 'post_interaction');
            const postInteractionSnapshot = await getDocs(postInteractionCollection);
            postInteractionSnapshot.forEach(doc => {
                if (doc.id === postData.id) {
                    setPostInteractionData(doc.data());
                    return doc.data();
                }
            });
        }

        const main = async () => {
            const postData = await fetchPostData();
            await fetchProfileData(postData);
            await load();
            await fetchPostInteractionData(postData);
        }

        main();
        

        TabTitle(`Post from ${postData.user_id} | Black Cat with Bow`);
    }, [postID, postData.user_id]);

    const validateComment = async () => {
        const commentInput = document.getElementById('comment-input').value;
        if (commentInput.trim() === ''){
            setShowCommentInput(false);
            return;
        }

        const commentPayload = {
            comment_input: commentInput,
            comment_time: serverTimestamp(),
            user_id: loginID,
        };
        
        const updatePostPayload = {
            number_of_comments: postData.number_of_comments + 1,
        };

        // send data to firestore
        await addDoc(collection(db, 'post', postID, 'comment'), {
            ...commentPayload,
        });
        console.log('payload sent');

        // update number of comments
        const updatePostRef = doc(db, 'post', postID);

        await updateDoc(updatePostRef, {
            ...updatePostPayload,
        });
        setPostData({
            ...postData,
            number_of_comments: postData.number_of_comments + 1,
        });

        // reset input
        setCommentText('');
        setShowCommentInput(false);
    };

    // Add Comment button handler
    const handleAddCommentClick = () => {
        setShowCommentInput(!showCommentInput);
    };

    // Like button handler
    const handleLike = async () => {
        const postInteractionCollection = collection(db, 'user_data', loginID, 'post_interaction');
        const postInteractionDoc = doc(postInteractionCollection, postID);
        if (postInteractionData.isLiked) {
            await updateDoc(postInteractionDoc, {
                isLiked: false,
            });
            await updateDoc(doc(db, 'post', postID), {
                number_of_likes: postData.number_of_likes - 1,
            });

            //update postData
            setPostData({
                ...postData,
                number_of_likes: postData.number_of_likes - 1,
            });

            setPostInteractionData({
                ...postInteractionData,
                isLiked: false,
            });
        } else {
            await updateDoc(postInteractionDoc, {
                isLiked: true,
            });
            await updateDoc(doc(db, 'post', postID), {
                number_of_likes: postData.number_of_likes + 1,
            });

            //update postData
            setPostData({
                ...postData,
                number_of_likes: postData.number_of_likes + 1,
            });

            setPostInteractionData({
                ...postInteractionData,
                isLiked: true,
            });
        }
    }

    // Delete Comment button handler
    const handleDeleteComment = async (commentID) => {
        try {
            await deleteDoc(doc(db, 'post', postID, 'comment', commentID));
            setCommentIdData(commentIdData.filter(comment => comment.id !== commentID));
            await updateDoc(doc(db, 'post', postID), {
                number_of_comments: postData.number_of_comments - 1,
            });
            setPostData({
                ...postData,
                number_of_comments: postData.number_of_comments - 1,
            });
            console.log('Comment deleted successfully');
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    return (
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
                                <div className='likeGroup'>
                                    {
                                        postInteractionData.isLiked ?
                                        <>
                                            <ion-icon name="heart" onClick={handleLike} style={{ fill: 'red' }}></ion-icon> {postData.number_of_likes}
                                        </>
                                        :
                                        <>
                                            <ion-icon name="heart-outline" onClick={handleLike}></ion-icon> {postData.number_of_likes}
                                        </>
                                    }
                                </div>
                                {
                                    
                                    <div className='commentGroup'>
                                    <ion-icon name="chatbox-outline"></ion-icon> {postData.number_of_comments}
                                </div>}
                                {/* <div className='repostGroup'>
                                    <ion-icon name="repeat-outline"></ion-icon> {postData.number_of_shares}
                                </div> */}
                            </div>
                        </div>
                    </div>

                        {/* Separator Line */ }
                    <hr className="post-separator" />

                    <div className="comment-section">
                        <h4>Comments</h4>
                        {commentIdData.map(comment => (
                            
                            <div key={comment.id} className="comment">
                                <div className='comment-container'>
                                    <div className="comment-header">
                                        <img src={comment.user.profile_pic} alt="User Pic" className="profile-pic" />
                                        <h4>{comment.user_id}</h4>
                                    </div>
                                    <p>{comment.comment_input}</p>
                                </div>
                                        {
                                            loginID === comment.user_id &&
                                            <div className="delete-comment" title='Delete your comment' onClick={() => handleDeleteComment(comment.id)}>
                                                <ion-icon name="trash-outline"></ion-icon>
                                            </div>
                                        }
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
                                    id='comment-input'
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    placeholder="Write a comment..."
                                />
                                <button className="submit-comment-btn" onClick={validateComment}>Submit</button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Post;
