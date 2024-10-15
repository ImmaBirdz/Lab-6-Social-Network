import '../css/Profile.css';
import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../variable/LoginContext';
import { db } from '../backend/firebaseConfig';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { TabTitle } from './TabTitle';
import TextPage from './TextPage';
import MediaPage from './mediaPage';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('Text'); // Set default tab to Text Page
    const { profileID } = useContext(LoginContext);
    const [profileData, setProfileData] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false); // Modal state
    const [editProfileData, setEditProfileData] = useState({}); // Editable profile uplode
    const [profilePic, setProfilePic] = useState(null); // State uploaded file

    useEffect(() => {
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

    // Handle open/close modal
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    // Handle input change in modal 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
        
        // Preview image
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditProfileData(prevData => ({
                    ...prevData,
                    profile_pic: reader.result 
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle saving edited profile data
    const handleSaveChanges = async () => {
        // Save updated data to the database (firebase)
        const userRef = doc(db, 'user_data', loginID); // Assuming loginID is the doc ID
        await updateDoc(userRef, editProfileData);

        // Update local state
        setProfileData(editProfileData);
        handleClose();
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
                        <div className="profPic" style={{ backgroundImage: `url(${profileData.profile_pic})` }}></div>

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
                            {profileData.number_of_posts > 1 ? 
                                <div className="postNum">{profileData.number_of_posts} posts</div> :
                                <div className="postNum">{profileData.number_of_posts} post</div>
                            }
                            {profileData.number_of_followers > 1 ? 
                                <div className="followersNum"><a href="#">{profileData.number_of_friends} friends</a></div> :
                                <div className="followersNum"><a href="#">{profileData.number_of_friends} friend</a></div>
                            }
                        </div>

                        <div className="editBtn">
                            <button onClick={handleShow}>Edit Profile</button>
                        </div>
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

            {/* Modal for editing profile */}
            {showModal && (
                <div className="modalBackdrop">
                    <div className="modalContent">
                        <h2>Edit Profile</h2>
                        <form>
                            <div className="formGroup">
                                <label>Current Profile Picture:</label>
                                <img src={profileData.profile_pic} alt="Current Profile" style={{ width: '100px', height: '100px' }} />
                            </div>

                            <div className="formGroup">
                                <label>Upload New Profile Picture:</label>
                                <input
                                    type="file"
                                    name="profile_pic"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="formGroup">
                                <label>Display Name:</label>
                                <input
                                    type="text"
                                    name="display_name"
                                    value={editProfileData.display_name || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="formGroup">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={editProfileData.email || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="formGroup">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={editProfileData.password || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="formGroup">
                                <label>Birthday:</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={editProfileData.birthday || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <button type="button" className="saveBtn" onClick={handleSaveChanges}>
                                Save Changes
                            </button>
                            <button type="button" className="closeBtn" onClick={handleClose}>
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </div>
    );
};

export default Profile;
