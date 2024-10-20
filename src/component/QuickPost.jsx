import React, { useState, useContext } from 'react';
import '../css/QP.css';
import { LoginContext } from '../variable/LoginContext'; // Adjust this xxx

const QuickPost = () => {
  const { profileName, profilePic } = useContext(LoginContext);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false); // State main modal
  const [post, setPost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEmojiPickerModalOpen, setIsEmojiPickerModalOpen] = useState(false); // State emoji modal

  const userProfile = {
    profileName: 'Catty chan',
    profilePic: 'https://img.icons8.com/color/96/cat-profile.png',
  };

  const togglePostModal = () => {
    setIsPostModalOpen(!isPostModalOpen);
  };

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

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

  const handleRemoveImage = () => {
    setSelectedImage(null); // Remove the selected image
  };

  const handleEmojiClick = (emoji) => {
    setPost((prevPost) => prevPost + emoji);
    setIsEmojiPickerModalOpen(false); 
  };

  const toggleEmojiPickerModal = () => {
    setIsEmojiPickerModalOpen((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Name:', profileName);
    console.log('Post:', post);
    console.log('Image:', selectedImage);
    setPost('');
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
                src={userProfile.profilePic || 'https://img.icons8.com/color/96/cat_in_a_box.png'} 
                alt="Profile"
              />
              <p>{userProfile.profileName}</p> 
            </div>
            
            <textarea
              className="post-input"
              placeholder="What's happening?"
              value={post}
              onChange={handlePostChange}
              required
            />

            {/* Display selected image with a delete button */}
            {selectedImage && (
              <div className="image-preview">
                <img src={selectedImage} alt="Selected" className="preview-image" />
                <button className="remove-image-button" onClick={handleRemoveImage}>
                  X
                </button>
              </div>
            )}

            {/* Icon options (image, EMOJI etc.if have time) */}
            <div className="options-section">
              <label htmlFor="image-upload">
                <img src="https://img.icons8.com/parakeet-line/48/FAB005/stack-of-photos.png" alt="Add image" className="icon" />
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
                className="icon" 
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
