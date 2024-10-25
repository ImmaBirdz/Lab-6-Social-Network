import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../variable/LoginContext'
import { storage, db } from '../backend/firebaseConfig'
import { collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, listAll, deleteObject } from 'firebase/storage'
import '../css/SideBarPost.css'

const SideBarPost = () => {
    const { isPostSidebarShown, setIsPostSidebarShown, isEditPostModalOpen, setIsEditPostModalOpen, postID, loginID } = useContext(LoginContext)
    const [profileData, setProfileData] = useState({})
    const [postData, setPostData] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch post data from the database
        const fetchPostData = async () => {
            let postData = {};
            const postCollection = collection(db, 'post');
            const postSnapshot = await getDocs(postCollection);
            postSnapshot.forEach(doc => {
                if (doc.id === postID) {
                    setPostData(doc.data());
                    postData = doc.data();
                }
            });
            //add id to postData
            postData.id = postID;
            return postData;
        }

        // fetch profile data from post data
        const fetchProfileData = async (postData) => {
            const userCollection = collection(db, 'user_data');
            const userSnapshot = await getDocs(userCollection);
            userSnapshot.forEach(doc => {
                if (doc.id === postData.user_id) {
                    setProfileData(doc.data());
                    return doc.data();
                }
            });
        }

        const main = async () => {
            const postData = await fetchPostData();
            await fetchProfileData(postData);
        }

        main();
    }, [postID, postData.user_id]);

    const togglePostSidebar = () => {
        setIsPostSidebarShown(!isPostSidebarShown);
    }
    
    // Edit Post button handler
    const handleEditPost = () => {
        setIsEditPostModalOpen(!isEditPostModalOpen);
    }    

    // Delete Post button handler
    const handleDeletePost = async (id) => {
        if (!window.confirm('Are you sure you want to delete this post?')) {
            return;
        } else {
            try {
                // Delete media from storage
                if (postData.media) {
                    try {
                        // Delete entire folder by post.id as folder name
                        const mediaRef = storageRef(storage, `post/${id}`);
                        const mediaList = await listAll(mediaRef);

                        mediaList.items.forEach(async item => {
                            await deleteObject(item);
                        });
                        console.log('Media successfully deleted.');
                    } catch (error) {
                        console.error('Error deleting media:', error);
                    }
                }
                
                await deleteDoc(doc(db, 'post', id));
                console.log('Post deleted successfully');
                // Update the number of posts in user_data
                const userDoc = doc(db, 'user_data', loginID);
                await updateDoc(userDoc, {
                    number_of_posts: profileData.number_of_posts - 1
                });
                setPostData(null);
                alert('Post deleted successfully');
                navigate(-1);
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    }
    
    return (
    <div>
        {
            isPostSidebarShown && (
                <div className="sidebar-post-modal-backdrop">
                    <div className="sidebar-post-modal-content">
                        <div className='sidebar-post-title'>Post Options</div>
                        <button type="button" className="sidebar-post-edit" onClick={handleEditPost}>
                            <ion-icon name="create-outline"></ion-icon> Edit Post
                        </button>
                        <button type="button" className="sidebar-post-delete" onClick={() => handleDeletePost(postID)}>
                            <ion-icon name="trash-outline"></ion-icon> Delete Post
                        </button>
                        <button type="button" className="sidebar-post-close" onClick={togglePostSidebar}>
                            &#10006; Close
                        </button>
                    </div>
                </div>
            )
        }
    </div>
    )
}

export default SideBarPost