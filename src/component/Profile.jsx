import '../css/Profile.css';
import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../variable/LoginContext';
import { db } from '../backend/firebaseConfig';
import { collection, doc, getDocs } from 'firebase/firestore';
import { TabTitle } from './TabTitle';
import TextPage from './TextPage';
import MediaPage  from './mediaPage';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('Text'); //set default tab to Text's Page
    const { profileID } = useContext(LoginContext);
    const [profileData, setProfileData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    console.log(profileID);

    useEffect(() => {
        TabTitle("Profile | Black Cat with Bow");
        // fetch user's profile data based on loginID from firebase
        const fetchProfileData = async () => {
            // fetch data from firebase
            const userDoc = collection(db, 'user_data');
            const userSnapshot = await getDocs(userDoc);
            userSnapshot.forEach(doc => {
                if (doc.data().username === profileID) {
                    setProfileData(doc.data());
                }
            });
        }
        console.log(profileData);
        fetchProfileData();
        setIsLoaded(true);
    }, [isLoaded]);

    return (
        <div className="profileContainer">

            <div className="bioPart">

                <div className="goBackTab">

                    <span className="icon">
                        <ion-icon name="caret-back-outline"></ion-icon>
                    </span>

                </div>

                <div className="bioBox">

                    <div className="leftBox">

                        <div className="profPic"></div>

                        <div className="accInfo">

                            <div className="nameBox">
                                <div className="profName">{profileData.display_name}</div>
                            </div>

                            <div className="bioPfBox">
                                <div className="accBio">{profileData.bio}</div>
                            </div>

                            <div className="accBox">
                                <div className="accProf"><a href="#" className='accProfName'>{profileData.username}</a></div>
                            </div>

                        </div>

                    </div>

                    <div className="rightBox">

                        <div className="accNum">
                            {
                                profileData.number_of_posts > 1 ? 
                                <div className="postNum">{profileData.number_of_posts} posts</div>
                                :
                                <div className="postNum">{profileData.number_of_posts} post</div>
                            }
                            {
                                profileData.number_of_followers > 1 ? 
                                <div className="followersNum"><a href="#">{profileData.number_of_friends} friends</a></div>
                                :
                                <div className="followersNum"><a href="#">{profileData.number_of_friends} friend</a></div>
                            }
                        </div>
                            
                        <div className="editBtn"><a href="#">Edit Profile</a></div>

                    </div>
                        
                </div>

            </div>

            <div className="line" />

            <div className="actionPart">

                <div className="actionBox">
                    <button onClick={() => setActiveTab('Text')}>Text</button>
                    <button onClick={() => setActiveTab('Media')}>Media</button>
                </div>
                {activeTab === 'Text' && <TextPage />}
                {activeTab === 'Media' && <MediaPage />}

            </div>
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

        </div>
    );
};

export default Profile;
