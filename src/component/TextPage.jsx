import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../backend/firebaseConfig';
import '../css/Profile.css';
import '../css/TextPage.css';
import { LoginContext } from '../variable/LoginContext';

const TextPage = () => {
    const [isSidebarShown, setSidebarShow] = useState(false);

    const toggleSidebar = () => {
        setSidebarShow(!isSidebarShown);
    };
    const { postID, loginID, profileID } = useContext(LoginContext);
    const [ postData, setPostData ] = useState([]); // State for post data
    const [ profileData, setProfileData ] = useState({}); // State for profile data
    const [ postInteractionData, setPostInteractionData ] = useState([]); // State for post interaction data
    const [loading, setLoading] = useState(true);

    // Fetch profile id
    useEffect(() => {
        const fetchProfileData = async () => {
            const userCollection = collection(db, 'user_data');
            const userSnapshot = await getDocs(userCollection);
            userSnapshot.forEach(doc => {
                if (doc.id === profileID) {
                    setProfileData(doc.data());
                }
            });
        }
        fetchProfileData();
    }, [profileID]);

    // Fetch all post data from this profileID
    useEffect(() => {
        const fetchPostData = async () => {
            const postCollection = collection(db, 'post');
            const postSnapshot = await getDocs(postCollection);
            const posts = [];
            postSnapshot.forEach(doc => {
                if (doc.data().user_id === profileID) {
                    posts.push({ ...doc.data(), id: doc.id });
                    // push posts id to post data
                    setPostData(postData => [...postData, { id: doc.id }]);
                }
            });
            // sort post data by timestamp (latest first)
            posts.sort((a, b) => b.post_time - a.post_time);
            setPostData(posts);
            setLoading(false);
        }
        fetchPostData()
    }, [profileID]);

    // Fetch post interaction data
    useEffect(() => {
        const fetchPostInteractionData = async () => {
            const postInteractionCollection = collection(db, 'user_data', loginID, 'post_interaction');
            const postInteractionSnapshot = await getDocs(postInteractionCollection)
            let postInteraction = [];
            postInteractionSnapshot.forEach(doc => {
                postInteraction.push({ ...doc.data(), id: doc.id });
            })
            setPostInteractionData(postInteraction);
        }
        fetchPostInteractionData();
    }, [profileID]);

    // Like button handler
    const handleLike = async () => {
        const postInteractionCollection = collection(db, 'user_data', loginID, 'post_interaction');
        const postInteractionDoc = doc(postInteractionCollection, postID);
        // if you don't have post interaction data, create one
        const postInteractionDocSnapshot = await getDocs(postInteractionCollection);
        let isLikedDocExists = false;

        postInteractionDocSnapshot.forEach(doc => {
            if (doc.id === postID) {
                isLikedDocExists = true;
            }
        });

        if (!isLikedDocExists) {
            await setDoc(postInteractionDoc, {
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

        if (postInteractionData.isLiked && isLikedDocExists) {
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


    return (
        loading ? <p className='postContainer'>Loading...</p> :
        <div className="postContainer">
            {postData.length === 0 ? (
                <p>No post found</p>
            ) : (
                postData.map((post, index) => (
                    post.user_id === profileID ? (
                        <div className="postBox" key={index} onClick={() => window.location.href = `/post/${post.id}`}>
                            <a href={`/post/${post.id}`}>
                                <div className="postedContent">
                                    <div className="userProf">
                                        <div className="userPics" onClick={() => window.location.href = `/${post.user_id}`}>
                                            <img style={{
                                                backgroundImage: `url(${profileData.profile_pic})`,
                                                backgroundSize: '65px 65px',
                                            }} />
                                        </div>
                                        <div className="infoPost">
                                            <span className='postDisplayName' onClick={() => window.location.href = `/${profileID}`}><b><a href={`/${post.user_id}`}>{profileData.display_name}</a></b></span>
                                            <span className='postUsername' onClick={() => window.location.href = `/${profileID}`}>{`@${post.user_id}`}</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="postText">{post.input}</p>
                                {
                                    post.media &&
                                    <div className='group-postImage'>
                                    {
                                        post.media.map((media, index) => (
                                            <div className="postImage" key={media}>
                                                <img src={media} />
                                            </div>
                                        ))
                                    }
                                    </div>
                                }
                                <div className='postTime'>{post.post_time ? new Date(post.post_time.seconds * 1000).toLocaleString() : ''}</div>
                                <div className="postAction">
                                    <div className="activitiesIcons">
                                        <div className='likeGroup' onClick={() => handleLike}>
                                            {
                                                postInteractionData.find(interaction => interaction.id === post.id)?.isLiked ?
                                                    <>
                                                        <ion-icon name="heart" onClick={handleLike} style={{ fill: 'red' }}></ion-icon> {post.number_of_likes}
                                                    </>
                                                    :
                                                    <>
                                                        <ion-icon name="heart-outline" onClick={handleLike}></ion-icon> {post.number_of_likes}
                                                    </>
                                            }
                                        </div>
                                        <div className='commentGroup'>
                                            <ion-icon name="chatbox-outline"></ion-icon> {post.number_of_comments}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    )
                        :
                        null
                ))
            )}
        </div>
    );
};

export default TextPage;
