import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
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
                id: doc.id, // Friend request ID (if needed)
                user1: data.user1,
                user2: data.user2,
            };
        });

        // Optional: filter out duplicates and format the output if necessary
        const uniqueFriends = Array.from(new Set(friends.map(friend => {
            return friend.user1 === loginID ? friend.user2 : friend.user1;
        })));

        return uniqueFriends; // Return an array of friend IDs (or objects)
        } catch (error) {
            console.error("Error fetching friends: ", error);
            return []; // Return an empty array in case of error
        }
    };

    const getFriendDetails = async (friendIds) => {
        try {
            // Create an array of promises to fetch each friend's details
            const friendDetailPromises = friendIds.map(async (friendId) => {
            const friendDocRef = doc(db, 'user_data', friendId);
            const friendDoc = await getDoc(friendDocRef);

            // Check if the friend exists
            if (friendDoc.exists()) {
                return { id: friendId, ...friendDoc.data() }; // Return friend ID and details
            } else {
                console.warn(`Friend with ID ${friendId} does not exist.`);
                return null; // Return null if the friend does not exist
            }
        });

            // Wait for all friend detail fetches to complete
            const friendDetails = await Promise.all(friendDetailPromises);

            // Filter out null values (friends that do not exist)
            return friendDetails.filter(detail => detail !== null);
        } catch (error) {
            console.error("Error fetching friend details: ", error);
            return []; // Return an empty array in case of error
        }
    };

    useEffect(() => {
        // Fetch friends for the current user
        getFriendsOfUser(loginID).then((friends) => {
            // Fetch details for each friend
            getFriendDetails(friends).then((friendDetails) => {
                // Update the state with the friend details
                setFriends(friendDetails);
            });
        });
    }, [loginID]);

    // Handle friend click event
    const handleFriendClick = (friend) => {
        if (location.pathname === `/message/chat`) {
            // Set the selected friend ID
            setSelectedFriend(friend.id);
        }
        else {
            // Redirect to the friend's profile page
            window.location.href = `/${friend.username}`;
        }
    }

    return (
        <aside className="sidebar-left">
            <div className="sidebar-left-title">
                {
                    // Display the sidebar title based on the current page
                    location.pathname === '/message/chat' ? <h3>Chat with Friend</h3> : <h2>Friends</h2>
                }
            </div>
            <ul>
                {friends.map(friend => (
                    <li key={friend.username} onClick={() => handleFriendClick(friend)}>
                    <img src={friend.profile_pic} alt={friend.username} className="profile-pic" />
                    <span>{friend.display_name}</span>
                    {/* {friend.isOnline && ( */}
                        <img 
                            src="https://img.icons8.com/?size=100&id=119894&format=png&color=000000" 
                            alt="Online" 
                            className="online-icon" 
                        />
                    {/* )} */}
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default SideBarLeft;