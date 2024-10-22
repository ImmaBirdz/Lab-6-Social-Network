import '../css/Profile.css';
import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '../variable/LoginContext';
import { db, storage } from '../backend/firebaseConfig';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { TabTitle } from './TabTitle';
import SideBarRight from './SideBarRight';
import TextPage from './TextPage';
import MediaPage from './mediaPage';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('Text'); // Set default tab to Text Page
    const { loginID, profileID } = useContext(LoginContext);
    const [profileData, setProfileData] = useState({});
    const [showModal, setShowModal] = useState(false); // Modal state
    const [editProfileData, setEditProfileData] = useState({}); // Editable profile upload
    const [newPassword, setNewPassword] = useState(''); // New pass
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm pass
    const [error, setError] = useState(''); // Error pass not match


    useEffect(() => {
        // Fetch user's profile data based on loginID from Firebase
        const fetchProfileData = async () => {
            const userDoc = collection(db, 'user_data');
            const userSnapshot = await getDocs(userDoc);
            userSnapshot.forEach(doc => {
                if (doc.data().username === profileID) {
                    setProfileData(doc.data());
                    setEditProfileData(doc.data());
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
        const newDisplayName = document.getElementById('display_name').value;
        const newEmail = document.getElementById('email').value;
        const newBio = document.getElementById('bio').value; 
        const newPassword = document.getElementById('password').value;
        const newBirthday = document.getElementById('birthday').value;
        if (newDisplayName !== '') {
            setEditProfileData(prevData => ({
                ...prevData,
                display_name: newDisplayName
            }));
        }
        if (newEmail !== '') {
            setEditProfileData(prevData => ({
                ...prevData,
                email: newEmail
            }));
        }
        if (newBio !== '') { //  bio
            setEditProfileData(prevData => ({
                ...prevData,
                bio: newBio
            }));
        }
        
        if (newPassword !== '') {
            if (newPassword !== confirmPassword) {
                setError("Password does not match.");
                return;
            } else {
                setEditProfileData(prevData => ({
                    ...prevData,
                    password: newPassword
                }));
            }
        }
        if (newBirthday !== '') {
            setEditProfileData(prevData => ({
                ...prevData,
                birthday: newBirthday
            }));
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const uploadedImg = storageRef(storage, `profile_pics/${loginID}`);
        uploadBytes(uploadedImg, e.target.files[0]).then((snapshot) => {
            getDownloadURL(uploadedImg).then((url) => {
                setEditProfileData(prevData => ({
                    ...prevData,
                    profile_pic: url
                }));
            });
        });
    };

    // Handle saving edited profile data
    const handleSaveChanges = async () => {
        
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                setError("Password does not match.");
                return;
            }
        }
    
        setError(''); 
    
        const userRef = doc(db, 'user_data', loginID); // Assume loginID is the doc ID
        await updateDoc(userRef, editProfileData);
    
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
                                <div className="accProf" onClick={() => window.location.href = `/${profileID}`}><a className='accProfName'>{`@${profileData.username}`}</a></div>
                            </div>
                        </div>
                    </div>

                    <div className="rightBox">
                        <div className="accNum">
                            {profileData.number_of_posts > 1 ? 
                                <div className="postNum">{profileData.number_of_posts} posts</div> 
                                :
                                <div className="postNum">{profileData.number_of_posts} post</div>
                            }
                            {profileData.number_of_friends > 1 ? 
                                <div className="followersNum"><a href="#">{profileData.number_of_friends} friends</a></div> 
                                :
                                <div className="followersNum"><a href="#">{profileData.number_of_friends} friend</a></div>
                            }
                        </div>
                        { // Show edit button if the profile is the user's own profile
                            profileID === loginID &&
                            <div className="editBtn">
                                <button onClick={handleShow}>Edit Profile</button>
                            </div>
                        }
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

                            {/* if want current profile pic it here */}

                            {/* <div className="formGroup">
                                <label>Current Profile Picture:</label>
                                <img src={profileData.profile_pic} alt="Current Profile" style={{ width: '100px', height: '100px' }} />
                            </div> */}

                            <div className="formGroup">
                                <label>Upload New Profile Picture:</label>
                                <input
                                    type="file"
                                    name="profile_pic"
                                    id='profile_pic'
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="formGroup">
                                <label>Display Name:</label>
                                <input
                                    type="text"
                                    name="display_name"
                                    id='display_name'
                                    value={editProfileData.display_name || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="formGroup">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    id='email'
                                    value={editProfileData.email || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="formGroup">
                                <label>Bio:</label>
                                <input
                                    type="text"
                                    name="bio"
                                    id="bio"
                                    value={editProfileData.bio || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="formGroup">
                                <label>New Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    id='password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            
                            <div className="formGroup">
                                <label>Confirm Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id='confirmPassword'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div className="formGroup">
                                <label>Birthday:</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    id='birthday'
                                    value={editProfileData.birthday || ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            {error && <p className="error">{error}</p>}

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
