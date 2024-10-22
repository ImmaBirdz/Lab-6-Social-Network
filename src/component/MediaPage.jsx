import '../css/Profile.css';
import '../css/MediaPage.css';
import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../variable/LoginContext';
import { db, storage } from '../backend/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { TabTitle } from './TabTitle';

const MediaPage = () => {
    TabTitle("Media | Black Cat with Bow");
    const { profileID } = useContext(LoginContext);
    const [ profileData, setProfileData ] = useState({});
    const [ postData, setPostData ] = useState([]);

    // fetch profile data
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

    // fetch post data
    useEffect(() => {
        const fetchPostData = async () => {
            const postCollection = collection(db, 'post');
            const postSnapshot = await getDocs(postCollection);
            const posts = [];
            postSnapshot.forEach(doc => {
                if (doc.data().profile_id === profileID) {
                    posts.push({...doc.data(), id: doc.id});
                }
            });
            posts.sort((a, b) => b.post_time - a.post_time);
            setPostData(posts);
        }
        fetchPostData();
    }, [profileID]);

    return (
        <div>

            <div className="mediaContain">

                <div class="mediaContainer">

                    <div class="mediaContent">
                        <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                    </div>

                    <div class="mediaContent">
                        <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                    </div>

                    <div class="mediaContent">
                        <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                    </div>

                    <div class="mediaContent">
                        <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                    </div>

                    <div class="mediaContent">
                        <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                    </div>

                    <div class="mediaContent">
                        <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                    </div>

                    <div class="mediaContent">
                        <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                    </div>

                    <div class="mediaContent">
                        <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                    </div>

                </div>

            </div>

        </div>);
};

export default MediaPage;   