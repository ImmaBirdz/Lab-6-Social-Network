import { collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../backend/firebaseConfig';
import '../css/QP.css';
import { LoginContext } from '../variable/LoginContext'; // Adjust this xxx

const EditPost = () => {
  const { loginID, postID, isEditPostModalOpen, setIsEditPostModalOpen } = useContext(LoginContext);
  const [ profileData, setProfileData ] = useState({}); // State profile data
  const [ profilePic, setProfilePic ] = useState(null); // State profile pic
  const [ postData, setPostData ] = useState({}); // State post data
  const [ postInput, setPostInput ] = useState('');
  const [ isEmojiPickerModalOpen, setIsEmojiPickerModalOpen ] = useState(false); // State emoji modal

  // fetch profile id from context
  useEffect(() => {
    const fetchProfileData = async () => {
      const userCollection = collection(db, 'user_data');
      const userSnapshot = await getDocs(userCollection);
      userSnapshot.forEach(doc => {
        if (doc.id === loginID) {
          setProfileData(doc.data());
          setProfilePic(doc.data().profile_pic);
        }
      });
    };
    fetchProfileData();
  }, [isEditPostModalOpen]);

  // fetch post data from this post
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
    fetchPostData();
  }, [postID]);

  // fetch post input from this post
  useEffect(() => {
    setPostInput(postData.input);
  }, [postData, postID]);

  // Main modal
  const toggleEditPostModal = () => {
    setIsEditPostModalOpen(!isEditPostModalOpen);
  };

  // Post input
  const handlePostChange = (e) => {
    setPostInput(e.target.value);

  };

  // Emoji picker
  const handleEmojiClick = (emoji) => {
    setPostInput((prevPost) => prevPost + emoji);
    setIsEmojiPickerModalOpen(false); 
  };

  // Emoji picker modal
  const toggleEmojiPickerModal = () => {
    setIsEmojiPickerModalOpen((prev) => !prev);
  };

  // Submit post
  const handleChangeSubmit = async (e) => {
    e.preventDefault();

    // Check if the input is empty
    if (!postInput) {
      alert('Post input cannot be empty');
      return;
    }
    // Update the post data
    const postDoc = doc(db, 'post', postID);
    await updateDoc(postDoc, {
      input: postInput,
      last_modified: serverTimestamp()
    })
    .then(() => {
      console.log('Document successfully updated!');
      alert('Post successfully updated!');
    })
    .catch((error) => {
      console.error('Error updating document: ', error);
    });

    // Reset input
    setPostInput('');
    setIsEditPostModalOpen(false);
  };

  // List 
  const emojis = [
    '😀', '😁', '😆', '😅', '🤣', '😊', '😇', '🥰', '😍', '😎', 
    '😜', '🤪', '😝', '🤑', '🤖', '👻', '💀', '🤯', '😺', '😸', 
    '😻', '😼', '😽', '😿', '🙀', '🤔', '😤', '😢', '😥'
  ];

  return (
    <div>

      {/* Main Post Modal */}
      {isEditPostModalOpen && (
        <div className="modal-overlay">
          <div className="post-modal"> 
            <button className="close-button" onClick={toggleEditPostModal}>
              Close 
            </button>
            
            {/* Profile info and post input */}
            <div className="profile-section">
              <img
                className="profile-pic"
                src={profilePic} 
                alt="Profile"
              />
              <div className="profile-info">
                <span className="postDisplayName">{profileData.display_name}</span>
                <span className='postUserName'>{`@${profileData.username}`}</span>
              </div>
            </div>
            
            <textarea
              className="post-input"
              placeholder="What's happening?"
              value={postInput}
              onChange={handlePostChange}
              required
            />

            {/* Icon options (image, EMOJI etc.if have time) */}
            <div className="options-section">
              <img 
                src="https://img.icons8.com/pulsar-color/48/cat-profile.png" 
                alt="Add emoji" 
                className="emoji-icon" 
                onClick={toggleEmojiPickerModal} 
              />
            </div>

            {/* Post Button */}
            <button className="post-button" type="submit" onClick={handleChangeSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Emoji Picker Modal */}
      {isEmojiPickerModalOpen && (
        <div className="modal-overlay">
          <div className="emoji-picker-modal"> 
            <button className="close-button" onClick={toggleEmojiPickerModal}>
              Close 
            </button>
            <h2>Select an Emoji</h2>
            <div className="emoji-picker">
              {emojis.map((emoji, index) => (
                <span 
                  key={index} 
                  onClick={() => handleEmojiClick(emoji)} 
                  style={{ cursor: 'pointer', fontSize: '24px', margin: '5px' }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPost;
