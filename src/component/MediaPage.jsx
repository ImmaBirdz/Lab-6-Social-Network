import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../backend/firebaseConfig';
import '../css/MediaPage.css';
import '../css/Profile.css';
import { LoginContext } from '../variable/LoginContext';
import { TabTitle } from './TabTitle';

const MediaPage = () => {
    TabTitle("Media | Black Cat with Bow");
    const { profileID } = useContext(LoginContext);
    const [profileData, setProfileData] = useState({});
    const [postData, setPostData] = useState([]);
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

    return (
        loading ? <p className="postContainer">Loading...</p> :
        <div className="mediaContain">
            <div className="mediaContainer">
                {
                    postData &&
                    //check if post has media some
                    postData && postData.some(post => Array.isArray(post.media) && post.media.length > 0) ? 
                    postData.map((post) => (
                        post.media && post.media.map((media) => (
                            <div className="mediaContent" key={media} onClick={() => window.location.href = `post/${post.id}`}>
                                <a href="#"><img src={media} alt="media"></img></a>
                            </div>
                        ))

                    )) 
                    : 
                    <>No Media Post</>
                }
            </div>
        </div>
    );
};

export default MediaPage;   