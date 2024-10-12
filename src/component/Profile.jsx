import '../css/Profile.css';
import React, { useState, useEffect } from 'react';
import { TabTitle } from './TabTitle';
import TextPage from './TextPage';
import MediaPage  from './mediaPage';

const Profile = () => {

    const [activeTab, setActiveTab] = useState('Text'); //set default tab to Text's Page

    useEffect(() => {
        TabTitle("Profile | Black Cat with Bow");
    }, []);

    return (
        <div className="profileContainer">

            <div className="bioPart">

                <div className="goBackTab">

                    <span className="icon">
                        <ion-icon name="caret-back-outline"></ion-icon>
                    </span>

                </div>

                <div className="bioBox">

                    <div className="leftBox">

                        <div className="profPic"></div>

                        <div className="accInfo">

                            <div className="nameBox">
                                <div className="profName">Your Profile Name</div>
                            </div>

                            <div className="bioPfBox">
                                <div className="accBio">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, labore.</div>
                            </div>

                            <div className="accBox">
                                <div className="accProf">@Your Account Profile</div>
                            </div>

                        </div>

                    </div>

                    <div className="rightBox">

                        <div className="accNum">
                            <div className="postNum">0 post</div>
                            <div className="followersNum"><a href="#">0 followers</a></div>
                            <div className="followingNum"><a href="#">0 following</a></div>
                        </div>
                            
                        <div className="editBtn"><a href="#">Edit Profile</a></div>

                    </div>
                        
                </div>

            </div>

            <div className="line"></div>

            <div className="actionPart">

                <div className="actionBox">
                    <button onClick={() => setActiveTab('Text')}>Text</button>
                    <button onClick={() => setActiveTab('Media')}>Media</button>
                </div>
                {activeTab === 'Text' && <TextPage />}
                {activeTab === 'Media' && <MediaPage />}

            </div>
            <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

        </div>
    );
};

export default Profile;
