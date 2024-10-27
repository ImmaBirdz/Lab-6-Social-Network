import React, { useState, useEffect, useContext } from 'react'
import { LoginContext } from '../variable/LoginContext'
import { db } from '../backend/firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import '../css/SideBarRight.css'

const SideBarRight = () => {

    const { loginID } = useContext(LoginContext);
    const [isSidebarShown, setIsSidebarShown] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (isFetched) return;

        // Fetch notifications and friend requests for the logged-in user
        fetchNotifications(loginID);
        fetchFriendRequests(loginID).then(() => {
            // Sort notifications by time
            sortNotifications(notifications);
        });

        // Fetch user data for each notification.from
        fetchUserData();

        setIsFetched(true);
    }, [loginID]);

    // sort notifications by time
    const sortNotifications = () => {
        setNotifications(prevNotifications =>
            [...prevNotifications].sort((a, b) => b.when - a.when)
        );
    }

    // fetch notifications for the logged-in user
    const fetchNotifications = async (loginID) => {
        if (loginID) {
            const notificationsRef = collection(db, 'notifications');
            const userDataRef = collection(db, 'user_data');

            // Fetch all notifications for the user with the given loginID
            const querySnapshot = await getDocs(notificationsRef);
            const userDataSnapshot = await getDocs(userDataRef);

            querySnapshot.docs.map(doc => {
                if (doc.data().to === loginID) {
                    userDataSnapshot.docs.map(userDoc => {
                        if (userDoc.id === doc.data().from) {
                            const { password, ...userData } = userDoc.data(); // Remove password from userData
                            setNotifications(prevNotifications => [...prevNotifications, { ...doc.data(), ...userData }]);
                        }
                    });
                }
            });
        }
    }

    // fetch friend requests for the logged-in user
    const fetchFriendRequests = async (loginID) => {
        if (loginID) {
            const friendRequestsRef = collection(db, 'friend_requests');
            const userDataRef = collection(db, 'user_data');

            // Fetch all friend requests for the user with the given loginID
            const querySnapshot = await getDocs(friendRequestsRef);
            const userDataSnapshot = await getDocs(userDataRef);

            querySnapshot.docs.map(doc => {
                if (doc.data().to === loginID) {
                    userDataSnapshot.docs.map(userDoc => {
                        if (userDoc.id === doc.data().from) {
                            const { password, ...userData } = userDoc.data(); // Remove password from userData
                            setNotifications(prevNotifications => [...prevNotifications, { ...doc.data(), type: 'friend_request', ...userData }]);
                        }
                    }
                    );
                }
            });
        }
    }

    // fetch every user data in notification.from
    const fetchUserData = async () => {
        const userDocInNotificationRef = collection(db, 'notifications');
        const userDocInFriendRequestRef = collection(db, 'friend_requests');
        const userDocInUserDataRef = collection(db, 'user_data');

        const userDocInNotification = await getDocs(userDocInNotificationRef);
        const userDocInFriendRequest = await getDocs(userDocInFriendRequestRef);
        const userDocInUserData = await getDocs(userDocInUserDataRef);

        // get user id in friend_requests  and notifications
        const userInFriendRequest = userDocInFriendRequest.docs.map(doc => doc.data().from);
        const userInNotification = userDocInNotification.docs.map(doc => doc.data().from);

        // remove duplicate user id
        const uniqueFriends = [...new Set([...userInFriendRequest, ...userInNotification])];

        // get user data in user_data from uniqueFriends
        const userDataInUserData = userDocInUserData.docs.filter(doc => uniqueFriends.includes(doc.id));
        const userData = userDataInUserData.map(doc => doc.data());
        setUserData(userData);
    }

    const toggleSidebar = () => {
        setIsSidebarShown(!isSidebarShown);
    }

    return (
        <div>

            <button className="toggle-sidebar-right" onClick={toggleSidebar}>
                {isSidebarShown ? '✖' : '☰'}
            </button>

            <aside className={`sidebar-right ${isSidebarShown ? 'show' : ''}`}>
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
                                    <div className="notification-friend-request-text">{`${notification.display_name} send a friend request to you.`}</div>
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
                                        <div className="notification-post-comment-text">{`@${notification.display_name} commented on your post. "${notification.comment}"`}</div>
                                        {/* <div className="notification-post-comment-text">{`""`}</div> */}
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