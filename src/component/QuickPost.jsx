import { addDoc, collection, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import { db, storage } from '../backend/firebaseConfig';
import '../css/QP.css';
import { LoginContext } from '../variable/LoginContext'; // Adjust this xxx

const QuickPost = () => {
  const { loginID, isPostModalOpen, setIsPostModalOpen } = useContext(LoginContext);
  const [profileData, setProfileData] = useState({}); // State profile data
  const [profilePic, setProfilePic] = useState(null); // State profile pic
  const [postInput, setPostInput] = useState('');
  const [selectedImage, setSelectedImage] = useState([]);
  const [imageURL, setImageURL] = useState([]);
  const [isEmojiPickerModalOpen, setIsEmojiPickerModalOpen] = useState(false); // State emoji modal

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
  }, [isPostModalOpen]);

  // Main modal
  const togglePostModal = () => {
    setIsPostModalOpen(!isPostModalOpen);
    if (!isPostModalOpen) {
      setSelectedImage([]);
    }
  };

  // Post input
  const handlePostChange = (e) => {
    setPostInput(e.target.value);

  };

  // Image upload
  const handleMediaAdd = (e) => {
    const fileArray = Array.from(e.target.files); 

    const imagePromises = fileArray.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((imageArray) => {
      //set of images prevet duplicate
      setSelectedImage((prevImage) => [...new Set([...prevImage, ...imageArray])]);
    });
  };

  // Remove image
  const handleMediaRemove = (data) => {
    //remove by url
    setSelectedImage((prevImage) => prevImage.filter((_, i) => _ !== data));
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
  const handleSubmit = async (e) => {
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
        user_id: loginID,
        input: input,
        post_time: serverTimestamp(),
        last_modified: serverTimestamp(),
        number_of_comments: 0,
        number_of_likes: 0
      };

      console.log("imageURL", imageURL.length);

    if (imageURL.length > 0) {
      newPostPayload.media = imageURL;
    }

      // Update the number of posts in user_data
    const userDoc = doc(db, 'user_data', loginID);
    await updateDoc(userDoc, {
        number_of_posts: profileData.number_of_posts + 1
      });
      // Add post to firestore
      addDoc(postCollection, newPostPayload).then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        console.log('selectedImage', selectedImage.length);
        if (selectedImage.length > 0) {
          handleUploads(docRef.id);
        }
        alert('Post upload successfully!');

    }).catch((error) => {
        alert('Error adding document: ', error);
      });
      setPostInput('');
      setSelectedImage(null);
      setIsEmojiPickerModalOpen(false);
      setImageURL([]);
      setIsPostModalOpen(false);
    };

  const handleUploads = async (postID) => {
    console.log("postID", postID);
    const urls = [];
    console.log("Uploading images");
  
    // Create an array to hold promises for each upload
    const uploadPromises = selectedImage.map(async (blobUrl) => {
      // Fetch the Blob from the Blob URL
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      
      const timestamp = Date.now(); // Current timestamp
      const randomString = Math.random().toString(36).substring(2, 15); // Random string for uniqueness
      const fileName = `${postID}_${timestamp}_${randomString}.png`; // Unique file name

      // Create a File object from the Blob
      const file = new File([blob], fileName, { type: blob.type });
  
      // Create a reference to the storage location
      const uploadedImg = storageRef(storage, `post/${postID}/${file.name}`); // Use file.name for proper file naming
  
      // Upload the file and get the download URL
      await uploadBytes(uploadedImg, file);
      const url = await getDownloadURL(uploadedImg);
      urls.push(url); // Add URL to the urls array
    });
  
    try {
      // Wait for all uploads to finish
      await Promise.all(uploadPromises);
      setImageURL(urls); // Set the URLs in your state

      //update post with array of urls
      const docRef = doc(db, 'post', postID);
      await updateDoc(docRef, {
        media: urls
      });
      console.log("Images uploaded");
    } catch (e) {
      console.error("Error uploading images:", e);
    }
  };

  // List 
  const emojis = [
    '😀', '😁', '😆', '😅', '🤣', '😊', '😇', '🥰', '😍', '😎',
    '😜', '🤪', '😝', '🤑', '🤖', '👻', '💀', '🤯', '😺', '😸',
    '😻', '😼', '😽', '😿', '🙀', '🤔', '😤', '😢', '😥'
  ];

  return (
    <div className="quick-post-modal" style={{ display: isPostModalOpen && 'flex' }}>
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

            <div className="image-preview">
              {selectedImage && selectedImage.map((image, index) => {
                return (
                  <div key={index} >
                    <img src={image} alt="Selected" className="preview-image" style={{}} />
                    <button className="remove-image-button" onClick={e => handleMediaRemove(image)}>
                      &#10006;
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Icon options (image, EMOJI etc.if have time) */}
            <div className="options-section">
              <label htmlFor="image-upload">
                <img src="https://img.icons8.com/parakeet-line/48/FAB005/stack-of-photos.png" alt="Add image" className="add-image-icon" />
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleMediaAdd}
                  multiple
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
