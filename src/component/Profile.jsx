import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import { db, storage } from '../backend/firebaseConfig';
import '../css/Profile.css';
import { LoginContext } from '../variable/LoginContext';
import MediaPage from './MediaPage';
import { TabTitle } from './TabTitle';
import SideBarRight from './SideBarRight';
import TextPage from './TextPage';


const Profile = () => {
    const [activeTab, setActiveTab] = useState('Text'); // Set default tab to Text Page
    const { loginID, profileID } = useContext(LoginContext);
    const [profileData, setProfileData] = useState({});
    const [showModal, setShowModal] = useState(false); // Modal state
    const [editProfileData, setEditProfileData] = useState({}); // Editable profile upload
    const [newPassword, setNewPassword] = useState(''); // New pass
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm pass
    const [error, setError] = useState(''); // Error pass not match
    const [friendStatus, setFriendStatus] = useState(false); // Friend status
    const [friendRequest, setFriendRequest] = useState(false); // Friend request status
    const [showFriendRequest, setShowFriendRequest] = useState(false); // Show friend request
    const [showFriendListModal, setShowFriendListModal] = useState(false);
    const [friendList, setFriendList] = useState([]);
    



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

    // Handle adding friend
    const handleAddFriend = async () => {
        const friendRequestsRef = collection(db, 'friend_requests'); // Reference to the collection

        const requestFriendPayload = {
            from: loginID,   // ID of the user sending the request
            to: profileID,   // ID of the user receiving the request
            when: serverTimestamp()  // Timestamp of when the request was made
        };

        try {
            // Add a new document to the 'friend_requests' collection
            await addDoc(friendRequestsRef, requestFriendPayload);
            setFriendRequest(true);
            console.log("Friend request sent");
        } catch (error) {
            console.error("Error sending friend request: ", error);
        }
    };

    // Handle undoing friend request
    const handleUndoRequest = async () => {
        try {
            const friendRequestsRef = collection(db, 'friend_requests'); // Reference to the collection

            // Create two queries to find requests between loginID and profileID (in both directions)
            const q1 = query(friendRequestsRef, where('from', '==', loginID), where('to', '==', profileID));
            const q2 = query(friendRequestsRef, where('from', '==', profileID), where('to', '==', loginID));

            // Fetch the matching documents for both queries
            const querySnapshot1 = await getDocs(q1);
            const querySnapshot2 = await getDocs(q2);

            // Combine both query results and loop through them to delete
            const allSnapshots = [...querySnapshot1.docs, ...querySnapshot2.docs];

            if (allSnapshots.length === 0) {
                console.log("No matching friend request found");
                return;
            }

            // Loop through each document and delete it
            allSnapshots.forEach(async (doc) => {
                await deleteDoc(doc.ref); // Delete the document
                setFriendRequest(false);
                setShowFriendRequest(false);
                console.log("Friend request rejected/undone");
            });
        } catch (error) {
            console.error("Error rejecting friend request: ", error);
        }
    };

    // Handle accepting friend request
    const handleAcceptRequest = async () => {
        try {
            const friendRequestsRef = collection(db, 'friend_requests'); // Reference to the collection

            // Create two queries to find requests between loginID and profileID (in both directions)
            const q1 = query(friendRequestsRef, where('from', '==', loginID), where('to', '==', profileID));
            const q2 = query(friendRequestsRef, where('from', '==', profileID), where('to', '==', loginID));

            // Fetch the matching documents for both queries
            const querySnapshot1 = await getDocs(q1);
            const querySnapshot2 = await getDocs(q2);

            // Combine both query results and loop through them to delete
            const allSnapshots = [...querySnapshot1.docs, ...querySnapshot2.docs];

            if (allSnapshots.length === 0) {
                console.log("No matching friend request found");
                return;
            }

            // Loop through each document and delete it
            allSnapshots.forEach(async (doc) => {
                await deleteDoc(doc.ref); // Delete the document
                setFriendStatus(true);
                setShowFriendRequest(false);
                console.log("Friend request accepted");
            });

            const friendsRef = collection(db, 'friends'); // Reference to the collection
            const friendPayload = {
                user1: loginID,
                user2: profileID,
                when: serverTimestamp()
            };

            // References to the user documents
            const user1DocRef = doc(db, 'user_data', loginID);
            const user2DocRef = doc(db, 'user_data', profileID);

            // Fetch user data
            const user1Data = await getDoc(user1DocRef);
            const user2Data = await getDoc(user2DocRef);

            // Check if both users exist
            if (!user1Data.exists() || !user2Data.exists()) {
                console.error("One or both user documents do not exist.");
                return;
            }

            const user1Friends = user1Data.data().number_of_friends;
            const user2Friends = user2Data.data().number_of_friends;

            console.log({ user1Friends, user2Friends });

            // Update number of friends for both users
            await updateDoc(user1DocRef, {
                number_of_friends: user1Friends + 1
            });

            await updateDoc(user2DocRef, {
                number_of_friends: user2Friends + 1
            });

            await addDoc(friendsRef, friendPayload);
            console.log("Friendship created");
        } catch (error) {
            console.error("Error accepting friend request: ", error);
        }
    };

    // Handle unfriending
    const handleUnfriend = async () => {
        try {
            const friendsRef = collection(db, 'friends'); // Reference to the collection

            // Create two queries to find the friendship between loginID and profileID (in both directions)
            const q1 = query(friendsRef, where('user1', '==', loginID), where('user2', '==', profileID));
            const q2 = query(friendsRef, where('user1', '==', profileID), where('user2', '==', loginID));

            // Fetch the matching documents for both queries
            const querySnapshot1 = await getDocs(q1);
            const querySnapshot2 = await getDocs(q2);

            // Combine both query results and loop through them to delete
            const allSnapshots = [...querySnapshot1.docs, ...querySnapshot2.docs];

            if (allSnapshots.length === 0) {
                console.log("No matching friendship found");
                return;
            }

            // References to the user documents
            const user1DocRef = doc(db, 'user_data', loginID);
            const user2DocRef = doc(db, 'user_data', profileID);

            // Fetch user data
            const user1Data = await getDoc(user1DocRef);
            const user2Data = await getDoc(user2DocRef);

            // Check if both users exist
            if (!user1Data.exists() || !user2Data.exists()) {
                console.error("One or both user documents do not exist.");
                return;
            }

            const user1Friends = user1Data.data().number_of_friends;
            const user2Friends = user2Data.data().number_of_friends;

            console.log({ user1Friends, user2Friends });

            // Update number of friends for both users
            await updateDoc(user1DocRef, {
                number_of_friends: user1Friends - 1
            });

            await updateDoc(user2DocRef, {
                number_of_friends: user2Friends - 1
            });

            // Loop through each document and delete it
            allSnapshots.forEach(async (doc) => {
                await deleteDoc(doc.ref); // Delete the document
                setFriendStatus(false);
                console.log("Friendship deleted");
            });
        } catch (error) {
            console.error("Error deleting friendship: ", error);
        }
    }

    // Check if the user is already friends with the profile or has sent a friend request
    useEffect(() => {
        if (loginID && profileID) {
            const friendRequestsRef = collection(db, 'friend_requests'); // Reference to the collection
            const querySnapshot = getDocs(friendRequestsRef);

            querySnapshot.then((snapshot) => {
                snapshot.forEach((doc) => {
                    const request = doc.data();
                    if (request.from === loginID && request.to === profileID) {
                        setFriendRequest(true);
                    } else if (request.from === profileID && request.to === loginID) {
                        setShowFriendRequest(true);
                    }
                });
            });

            const friendsRef = collection(db, 'friends');
            const querySnapshot2 = getDocs(friendsRef);

            querySnapshot2.then((snapshot) => {
                snapshot.forEach((doc) => {
                    const friend = doc.data();
                    if ((friend.user1 === loginID && friend.user2 === profileID) || (friend.user1 === profileID && friend.user2 === loginID)) {
                        setFriendStatus(true);
                    }
                });
            });
        }
    }, [loginID, profileID]);

    
    const fetchFriendList = async () => {
        try {
            const friendsRef = collection(db, 'friends');
            const friendQuery = query(
                friendsRef,
                where('user1', '==', profileID) 
            );
            const friendSnapshot = await getDocs(friendQuery);
            
            const friends = friendSnapshot.docs.map(doc => doc.data());
            setFriendList(friends);
            
            // Set the modal to show
            setShowFriendListModal(true);
        } catch (error) {
            console.error("Error fetching friend list: ", error);
        }

        
    };
    
    

    return (
        <div className="profileContainer">

            <div className="bioPart">
                
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
                            
                            {profileData.number_of_friends > 1 ? (
                                <div className="followersNum">
                                    <a href="#" onClick={fetchFriendList}>
                                        {profileData.number_of_friends} friends
                                    </a>
                                </div>
                            ) : (
                                <div className="followersNum">
                                    <a href="#" onClick={fetchFriendList}>
                                        {profileData.number_of_friends} friend
                                    </a>
                                </div>
                            )}
                        </div>
                            { profileID === loginID ? (
                                <div className="editBtn">
                                    <button onClick={handleShow}>Edit Profile</button>
                                </div>
                            )
                                :
                                (
                                    friendStatus ?
                                        <>
                                            <div className="editBtn">
                                                <button>Friend</button>
                                            </div>
                                            <div className="editBtn">
                                                <button onClick={handleUnfriend}>Unfriend</button>
                                            </div>
                                        </>
                                        :
                                        showFriendRequest ?
                                            <>
                                                <div className="editBtn">
                                                    <button onClick={handleAcceptRequest}>Accept Request</button>
                                                </div>
                                                <div className="editBtn">
                                                    <button onClick={handleUndoRequest}>Reject Request</button>
                                                </div>
                                            </>
                                            :
                                            friendRequest ?
                                                <div className="editBtn">
                                                    <button onClick={handleUndoRequest}>Undo Request</button>
                                                </div>
                                                :
                                                <div className="editBtn">
                                                    <button onClick={handleAddFriend}>Add Friend</button>
                                                </div>
                                )
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

        
            {/* Friend List Modal */}
            {showFriendListModal && (
                 <div className="FriendModal">
                    <div className="FmodalContent">
                        <button className="FcloseButton" onClick={() => setShowFriendListModal(false)}>✕</button>
                        <h2>Friends of {profileData.display_name}</h2>
                        <ul>
                            {friendList.map((friend, index) => (
                                <li key={index}>
                                    <a href={`/${friend.user2}`} className="friendLink">
                                        <div


                                        // ลิ้งไปโปรไฟล์โอเครดีแต่ว่าทำไทภาพตไม่ขึ้นไม่รู้ใครทำได้ฟากแก้ตรงนี้ที

                                            className="friendProfilePic"
                                            style={{ backgroundImage: `url(${friend.profile_pic || 'default-pic-url'})` }}
                                        ></div>
                                        <span>{friend.user2}</span>
                                    </a>
                                </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}


                                

                                  

                                

                   

            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
        </div>
    );
};

export default Profile;
