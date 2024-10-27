import React, { useEffect, useState, useContext } from 'react';
import '../css/Search.css';
import { LoginContext } from '../variable/LoginContext';
import { TabTitle } from './TabTitle';
import { db } from '../backend/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Search = () => {
  const { loginID } = useContext(LoginContext);
  const [ searchTerm, setSearchTerm ] = useState('');
  const [ profileData, setProfileData ] = useState([]); // State for profile data

  useEffect(() => {
    TabTitle('Search | Black Cat with Bow');
  }, []);

  // fetch every profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      const userCollection = collection(db, 'user_data');
      const userSnapshot = await getDocs(userCollection);
      const profileData = [];
      userSnapshot.forEach(doc => {
        profileData.push({...doc.data(), id: doc.id});
      });
      setProfileData(profileData);
    };
    fetchProfileData();
  }, []);

  const Search = (event) => {
    setSearchTerm(event.target.value);
  };

  

  return (
    <div className="SbackgroundContainer">
      
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search Profile by Username"
          value={searchTerm}
          onChange={Search}
          className="search-bar"
        />
        {
          searchTerm.length === 0 ? <p className="search-info">Search for profile...</p>
          :
          <ul className="search-results">
          {
          profileData
            .filter((profile) =>
              profile.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((filteredProfileData, index) => (
              <div key={index} className='search-profile-box'>
                <div className="search-profile-content">
                  <a href={`/${filteredProfileData.username}`} className="search-profile-pic">
                  {
                    !filteredProfileData.profile_pic ? null
                    : <img src={filteredProfileData.profile_pic} alt="Profile" className="search-profile-pic" />
                  }
                  </a>
                  <div className="search-profile-info">
                    <a href={`/${filteredProfileData.username}`} className="search-profile-display">
                      {filteredProfileData.display_name}
                    </a>
                    <a href={`/${filteredProfileData.username}`} className="search-profile-id">
                      {`@${filteredProfileData.username}`}
                    </a>
                  </div>
                  <div className="search-profile-bio">{filteredProfileData.bio}</div>
                </div>
              </div>
            ))
            .concat(
              profileData.filter((profile) =>
                profile.username.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 ? <p className="search-info">Profile not found</p> : []
            )
            }
        </ul>
        }
        
      </div>
    </div>
  );
};

export default Search;