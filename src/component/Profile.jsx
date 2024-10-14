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
    const [isEditing, setIsEditing] = useState(false); // Edit mode state
    const [updatedName, setUpdatedName] = useState('');
    const [updatedProfilePic, setUpdatedProfilePic] = useState('');
    
    useEffect(() => {
        TabTitle("Profile | Black Cat with Bow");
        // Fetch user's profile data based on loginID from Firebase
        const fetchProfileData = async () => {
            const userDoc = collection(db, 'user_data');
            const userSnapshot = await getDocs(userDoc);
            userSnapshot.forEach(doc => {
                if (doc.data().username === profileID) {
                    setProfileData(doc.data());
                    setUpdatedName(doc.data().display_name); // Set initial name
                    setUpdatedProfilePic(doc.data().profile_picture); // Set initial profile pic
                }
            });
        }
        fetchProfileData();
        TabTitle(`${profileData.display_name} (@${profileID}) | Black Cat with Bow`);
    }, [profileData.display_name, profileID]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        // Save the updated data to Firebase here
        // Update profileData with new values
        setProfileData(prevData => ({
            ...prevData,
            display_name: updatedName,
            profile_picture: updatedProfilePic
        }));
    };

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUpdatedProfilePic(URL.createObjectURL(file));
        }
    };

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
                        {isEditing ? (
                            <div className="profPic">

                                <label htmlFor="profile-pic-upload" className="upload-label">Change Picture</label>
                                <input type="file" id="profile-pic-upload" onChange={handleProfilePicChange} />
                            </div>
                        ) : (
                            <div className="profPic" style={{ backgroundImage: `url(${profileData.profile_picture || updatedProfilePic})` }}></div>
                        )}
                        
                        <div className="accInfo">
                            <div className="nameBox">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={updatedName}
                                        placeholder="Edit name here" 
                                        onChange={(e) => setUpdatedName(e.target.value)}
                                        className="profName"
                                    />
                                ) : (
                                    <div className="profName">{profileData.display_name}</div>
                                )}
                            </div>

                            <div className="bioPfBox">
                                <div className="accBio">{profileData.bio}</div>
                            </div>

                            <div className="accBox">
                                <div className="accProf"><a href="#" className='accProfName'>{`@${profileData.username}`}</a></div>
                            </div>
                        </div>
                    </div>

                    <div className="rightBox">
                        <div className="accNum">
                            {profileData.number_of_posts > 1 ? (
                                <div className="postNum">{profileData.number_of_posts} posts</div>
                            ) : (
                                <div className="postNum">{profileData.number_of_posts} post</div>
                            )
                            }
                            {
                                profileData.number_of_friends > 1 ? 
                                <div className="followersNum"><a href="#">{profileData.number_of_friends} friends</a></div>
                                :
                                <div className="followersNum"><a href="#">{profileData.number_of_friends} friend</a></div>
                            }
                        </div>

                        {isEditing ? (
                            <div className="editBtn">
                                <button onClick={handleSaveClick}>Save</button>
                            </div>
                        ) : (
                            <div className="editBtn">
                                <button onClick={handleEditClick}>Edit Profile</button>
                            </div>
                        )}
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
