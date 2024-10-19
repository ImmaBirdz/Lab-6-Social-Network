import React, { useState, useContext } from 'react';
import '../css/QP.css';
import { LoginContext } from '../variable/LoginContext'; // Adjust this

const QuickPost = () => {
  const { profileName } = useContext(LoginContext); // Assuming profileName comes from context
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState('');

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handlePostChange = (e) => {
    setPost(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Name:', profileName); // Use the profile name from context
    console.log('Post:', post);
    setPost('');
    setIsOpen(false);
  };

  return (
    <div>
      <img
        className="circle-icon"
        src="https://img.icons8.com/color/96/cat_in_a_box.png"
        alt="Post something"
        onClick={toggleModal}
      />
     {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={toggleModal}>
              &times; 
            </button>
            <h2>What's on your mind?</h2>
            <p>{profileName}</p> {/* Display the profile name XX fix later */}
            <textarea
              placeholder="Write something..."
              value={post}
              onChange={handlePostChange}
              required
            />
            <button type="submit" onClick={handleSubmit}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickPost;