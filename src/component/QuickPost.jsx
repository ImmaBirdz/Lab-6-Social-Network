import React, { useState, useContext, useEffect } from 'react';
import '../css/QP.css';
import { LoginContext } from '../variable/LoginContext'; // Adjust this xxx
import { db } from '../backend/firebaseConfig';
import { collection, doc, getDocs, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

const QuickPost = () => {
  const { profileID } = useContext(LoginContext);
  const [ profileData, setProfileData ] = useState({}); // State profile data
  const [ profilePic, setProfilePic ] = useState(null); // State profile pic
  const [isPostModalOpen, setIsPostModalOpen] = useState(false); // State main modal
  const [postInput, setPostInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEmojiPickerModalOpen, setIsEmojiPickerModalOpen] = useState(false); // State emoji modal

  // fetch profile id from context
  useEffect(() => {
    const fetchProfileData = async () => {
      const userCollection = collection(db, 'user_data');
      const userSnapshot = await getDocs(userCollection);
      userSnapshot.forEach(doc => {
        if (doc.id === profileID) {
          setProfileData(doc.data());
          setProfilePic(doc.data().profile_pic);
        }
      });
    };
    fetchProfileData();
  }, [isPostModalOpen]);

  // Main modal
  const togglePostModal = () => {
    setIsPostModalOpen(!isPostModalOpen);
  };

  // Post input
  const handlePostChange = (e) => {
    setPostInput(e.target.value);

  };

  // Image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setSelectedImage(null); // Remove the selected image
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
  const handleSubmit =  async (e) => {
    e.preventDefault();

    // Check if the input is empty
    if (!postInput) {
      alert('Please enter something before posting!');
      return;
    }
    // Get the input value
    const input = postInput;

    // Get collection from firestore
    const postCollection = collection(db, 'post');

    // Add post info to payload
    const newPostPayload = {
      user_id: profileID,
      input: input,
      last_modified: serverTimestamp(),
      number_of_comments: 0,
      number_of_likes: 0,
      number_of_repost: 0,
      media: selectedImage ? selectedImage : ''
    };
    // Update the number of posts in user_data
    const userDoc = doc(db, 'user_data', profileID);
    await updateDoc(userDoc, {
      number_of_posts: profileData.number_of_posts + 1
    });
    // Add post to firestore
    addDoc(postCollection, newPostPayload).then((docRef) => {
      alert('Post upload successfully!');
    }).catch((error) => {
      alert('Error adding document: ', error);
    });
    setPostInput('');
    setSelectedImage(null);
    setIsPostModalOpen(false);
    setIsEmojiPickerModalOpen(false); 
  };

  // List 
  const emojis = [
    '😀', '😁', '😆', '😅', '🤣', '😊', '😇', '🥰', '😍', '😎', 
    '😜', '🤪', '😝', '🤑', '🤖', '👻', '💀', '🤯', '😺', '😸', 
    '😻', '😼', '😽', '😿', '🙀', '🤔', '😤', '😢', '😥'
  ];

  return (
    <div>
      {/* Profile Icon */}
      <img
        className="circle-icon"
        src="https://img.icons8.com/color/96/cat_in_a_box.png"
        alt="Post something"
        onClick={togglePostModal}
      />

      {/* Main Post Modal */}
      {isPostModalOpen && (
        <div className="modal-overlay">
          <div className="post-modal"> 
            <button className="close-button" onClick={togglePostModal}>
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

            {/* Display selected image with a delete button */}
            {selectedImage && (
              <div className="image-preview">
                <img src={selectedImage} alt="Selected" className="preview-image" style={{}} />
                <button className="remove-image-button" onClick={handleRemoveImage}>
                  &#10006;
                </button>
              </div>
            )}

            {/* Icon options (image, EMOJI etc.if have time) */}
            <div className="options-section">
              <label htmlFor="image-upload">
                <img src="https://img.icons8.com/parakeet-line/48/FAB005/stack-of-photos.png" alt="Add image" className="add-image-icon" />
                <input 
                  type="file" 
                  id="image-upload" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ display: 'none' }} // Hide the file input
                />
              </label>
              <img 
                src="https://img.icons8.com/pulsar-color/48/cat-profile.png" 
                alt="Add emoji" 
                className="emoji-icon" 
                onClick={toggleEmojiPickerModal} 
              />
            </div>

            {/* Post Button */}
            <button className="post-button" type="submit" onClick={handleSubmit}>
              Post
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

export default QuickPost;
