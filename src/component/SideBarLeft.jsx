import { collection, doc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../backend/firebaseConfig';
import '../css/SideBarLeft.css';
import { LoginContext } from '../variable/LoginContext';
import { useLocation } from 'react-router-dom';

const SideBarLeft = () => {
    const { loginID, setSelectedFriend } = useContext(LoginContext);
    const [ friends, setFriends ] = useState([]);
    const location = useLocation();

    const getFriendsOfUser = async (loginID) => {
        try {
            const friendsRef = collection(db, 'friends'); // Reference to the friends collection

            // Create two queries to find friend requests involving the loginID
            const q1 = query(friendsRef, where('user1', '==', loginID));
            const q2 = query(friendsRef, where('user2', '==', loginID));
            
            // Fetch the matching documents for both queries
            const querySnapshot1 = await getDocs(q1);
            const querySnapshot2 = await getDocs(q2);
            
            // Combine both query results
            const allFriendDocs = [...querySnapshot1.docs, ...querySnapshot2.docs];
            
            // Extract friend IDs and details
            const friends = allFriendDocs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    user1: data.user1,
                    user2: data.user2,
                };
            });

        const uniqueFriends = Array.from(new Set(friends.map(friend => {
            return friend.user1 === loginID ? friend.user2 : friend.user1;
        })));

        return uniqueFriends; // Return an array of friend IDs (or objects)
        } catch (error) {
            console.error("Error fetching friends: ", error);
            return []; // Return an empty array in case of error
        }
    };

    const subscribeToFriendStatus = (friendIds) => {
        const unsubscribes = friendIds.map(friendId => {
            const friendDocRef = doc(db, 'user_data', friendId);
            
            // Listen for real-time updates on each friend's document
            return onSnapshot(friendDocRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const friendData = { id: friendId, ...docSnapshot.data() };

                    setFriends(prevFriends => {
                        const updatedFriends = prevFriends.filter(f => f.id !== friendId);
                        return [...updatedFriends, friendData];
                    });
                }
            });
        });

        // Return an unsubscribe function that removes all listeners
        return () => unsubscribes.forEach(unsubscribe => unsubscribe());
    };

    useEffect(() => {
        getFriendsOfUser(loginID).then((friends) => {
            const unsubscribe = subscribeToFriendStatus(friends);
            
            // Clean up listeners on component unmount
            return () => unsubscribe();
        });
    }, [loginID]);

    const handleFriendClick = (friend) => {
        if (location.pathname === `/message/chat`) {
            setSelectedFriend(friend.id);
        } else {
            window.location.href = `/${friend.username}`;
        }
    };

    return (
        <aside className="sidebar-left">
            <div className="sidebar-left-title">
                {location.pathname === '/message/chat' ? <h3>Chat with Friends</h3> : <h2>Friends</h2>}
            </div>
            <ul>
                {friends.map(friend => (
                    <li key={friend.username} onClick={() => handleFriendClick(friend)}>
                        <img src={friend.profile_pic} alt={friend.username} className="profile-pic" />
                        <div className="sidebar-left-friend-info">
                            <span className='sidebar-left-display-name'>{friend.display_name}</span>
                            <span className='sidebar-left-username'>{`@${friend.username}`}</span>
                        </div>
                        {friend.isOnline && (
                            <div className="sidebar-left-online-icon">
                                <img 
                                    src="https://img.icons8.com/?size=100&id=119894&format=png&color=000000" 
                                    alt="Online" 
                                    className="online-icon" 
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default SideBarLeft;
