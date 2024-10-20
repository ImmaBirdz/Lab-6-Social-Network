import React, { useState, useEffect, useContext } from 'react'
import { LoginContext } from '../variable/LoginContext'
import { db } from '../backend/firebaseConfig'
import { collection, doc, getDocs, updateDoc, setDoc } from 'firebase/firestore'
import '../css/Page.css'
import '../css/TextPage.css'
import { TabTitle } from './TabTitle'

const Page = () => {
    const { loginID } = useContext(LoginContext);
    const [ postData, setPostData ] = useState([]); // State for post data
    const [ profileData, setProfileData ] = useState([]); // State for profile data
    const [ postInteractionData, setPostInteractionData ] = useState([]); // State for post interaction data

    useEffect(() => {
        TabTitle("Feed | Black Cat with Bow");
    } , []);

    // fetch every post data to postData and sort by post time
    useEffect(() => {
        const fetchPostData = async () => {
            const postCollection = collection(db, 'post');
            const postSnapshot = await getDocs(postCollection);
            const posts = [];
            postSnapshot.forEach(doc => {
                posts.push({...doc.data(), id: doc.id});
            });
            posts.sort((a, b) => b.post_time - a.post_time);
            setPostData(posts);
        }
        fetchPostData();
    }, []);

    // fetch every profile data
    useEffect(() => {
        const fetchProfileData = async () => {
            const userCollection = collection(db, 'user_data');
            const userSnapshot = await getDocs(userCollection);
            let profileData = [];
            userSnapshot.forEach(doc => {
                profileData.push({...doc.data(), id: doc.id});
            });
            setProfileData(profileData);
        }
        fetchProfileData();
    }, []);

    // fetch post interaction data
    useEffect(() => {
        const fetchPostInteractionData = async () => {
            const postInteractionCollection = collection(db, 'user_data', loginID, 'post_interaction');
            const postInteractionSnapshot = await getDocs(postInteractionCollection)
            let postInteraction = [];
            postInteractionSnapshot.forEach(doc => {
                postInteraction.push({...doc.data(), id: doc.id });
            })
            setPostInteractionData(postInteraction);
        }
        fetchPostInteractionData();
    }, [loginID]);

    // Like button handler
    const handleLike = async (postID) => {
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
        <div>
            <body>
                <div className="container">
                    <main className="feed">
                        <div className="new-post">
                            <textarea placeholder="What's on your mind?" rows="3"></textarea>
                            <button>Post</button>
                        </div>
                        {postData.map((post, index) => {
                            const tempProfileData = profileData.find(profile => profile.id === post.user_id);
                            
                            return (
                                <div className="postBox" key={index} onClick={() => window.location.href = `/post/${post.id}`}>
                                    <a href={`/post/${post.id}`}>
                                        <div className="postedContent">
                                            <div className="userProf">
                                                <div className="userPics" onClick={() => window.location.href = `/${post.user_id}`}>
                                                    <img style={{ 
                                                        backgroundImage: `url(${tempProfileData.profile_pic})`, 
                                                        backgroundSize: '65px 65px',
                                                    }} />
                                                </div>
                                                <div className="infoPost">
                                                    <span className='postDisplayName' onClick={() => window.location.href = `/${tempProfileData?.username}`}><b><a href={`/${post.user_id}`}>{tempProfileData.display_name}</a></b></span>
                                                    <span className='postUsername' onClick={() => window.location.href = `/${tempProfileData?.username}`}>{`@${post.user_id}`}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="postText">{post.input}</p>
                                        <div className='postTime'>{post.post_time ? new Date(post.post_time.seconds * 1000).toLocaleString() : ''}</div>
                                        <div className="postAction">
                                    <div className="activitiesIcons">
                                        <div className='likeGroup' onClick={() => handleLike(post.id)}>
                                            {
                                                postInteractionData.find(interaction => interaction.id === post.id)?.isLiked ? 
                                                <>
                                                    <ion-icon name="heart" onClick={() => handleLike(post.id)} style={{ fill: 'red' }}></ion-icon> {post.number_of_likes}
                                                </>
                                                :
                                                <>
                                                    <ion-icon name="heart-outline" onClick={() => handleLike(post.id)}></ion-icon> {post.number_of_likes}
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
                            );
                        })}
                    </main>
                </div>
            </body>
        </div>
    );
};

export default Page;
