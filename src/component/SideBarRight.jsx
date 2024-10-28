import React, { useState, useEffect, useContext } from 'react'
import { LoginContext } from '../variable/LoginContext'
import { db } from '../backend/firebaseConfig'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import '../css/SideBarRight.css'

const SideBarRight = () => {

    const { loginID } = useContext(LoginContext);
    const [notifications, setNotifications] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (!loginID) return;

        const notificationsUnsub = fetchNotifications(loginID);
        const friendRequestsUnsub = fetchFriendRequests(loginID);

        // Cleanup listeners on component unmount
        return () => {
            notificationsUnsub();
            friendRequestsUnsub();
        };
    }, [loginID]);

    // Fetch notifications for the logged-in user in real-time
    const fetchNotifications = (loginID) => {
        const notificationsRef = collection(db, 'notifications');
        const userDataRef = collection(db, 'user_data');

        return onSnapshot(notificationsRef, async (querySnapshot) => {
            const userDataSnapshot = await getDocs(userDataRef);
            const newNotifications = [];

            querySnapshot.forEach(doc => {
                if (doc.data().to === loginID) {
                    userDataSnapshot.docs.forEach(userDoc => {
                        if (userDoc.id === doc.data().from) {
                            const { password, ...userData } = userDoc.data(); // Remove password from userData
                            newNotifications.push({ ...doc.data(), ...userData });
                        }
                    });
                }
            });

            // Sort notifications by time and update state
            setNotifications(newNotifications.sort((a, b) => b.when - a.when));
        });
    }

    // Fetch friend requests for the logged-in user in real-time
    const fetchFriendRequests = (loginID) => {
        const friendRequestsRef = collection(db, 'friend_requests');
        const userDataRef = collection(db, 'user_data');

        return onSnapshot(friendRequestsRef, async (querySnapshot) => {
            const userDataSnapshot = await getDocs(userDataRef);
            const newFriendRequests = [];

            querySnapshot.forEach(doc => {
                if (doc.data().to === loginID) {
                    userDataSnapshot.docs.forEach(userDoc => {
                        if (userDoc.id === doc.data().from) {
                            const { password, ...userData } = userDoc.data();
                            newFriendRequests.push({ ...doc.data(), type: 'friend_request', ...userData });
                        }
                    });
                }
            });

            // Update notifications state with sorted friend requests
            setNotifications(prevNotifications => 
                [...prevNotifications, ...newFriendRequests].sort((a, b) => b.when - a.when)
            );
        });
    }

    return (
        <div>

            <aside className='sidebar-right'>
                <div className="sidebar-right-content">
                    <div className="sidebar-right-title">
                        <h3>Notification</h3>
                    </div>
                    <ul>
                        {notifications.map(notification => (
                            notification.type === 'friend_request' ?
                            <li key={notification.id}>
                                <div className='group-notification' onClick={() => window.location.href = `/${notification.from}`}>
                                    <img className="notification-profile-pic" style={{
                                        backgroundImage: `url(${notification.profile_pic})`,
                                        backgroundSize: '48px 48px',
                                    }}/>
                                    <div className="notification-friend-request-text">{`${notification.display_name} sent a friend request to you.`}</div>
                                </div>
                            </li>
                            : notification.type === 'post_like' ?
                            <li key={notification.id}>
                                <div className='group-notification' onClick={() => window.location.href = `/post/${notification.post_id}`}>
                                    <img className="notification-profile-pic" style={{
                                        backgroundImage: `url(${notification.profile_pic})`,
                                        backgroundSize: '48px 48px',
                                    }}/>
                                    <div className="notification-post-like-text">{`${notification.display_name} liked your post.`}</div>
                                </div>
                            </li>
                            : notification.type === 'post_comment' ?
                            <li key={notification.id}>
                                <div className='group-notification' onClick={() => window.location.href = `/post/${notification.post_id}`}>
                                    <img className="notification-profile-pic" style={{
                                        backgroundImage: `url(${notification.profile_pic})`,
                                        backgroundSize: '48px 48px',
                                    }}/>
                                    <div className="group-post-comment">
                                        <div className="notification-post-comment-text">{`${notification.display_name} commented on your post. "${notification.comment}"`}</div>
                                    </div>
                                </div>
                            </li>
                            : null
                        ))}
                    </ul>
                </div>
            </aside>

        </div>
    )
}

export default SideBarRight;