import React from 'react';
import '../css/Profile.css';
import '../css/TextPage.css';

const TextPage = () => {
    return (
        <div className="postContainer">
            <div className="postBox">
                <div className="postedContent">
                    <div className="userProf">
                        <a href="#">
                            <div className="userPics">
                                <img width="40" height="40"
                                    src="https://img.icons8.com/office/40/circled-user-female-skin-type-1-2.png"
                                    alt="User Profile" />
                            </div>
                            <p>nAme_user</p>
                        </a>
                        <span>Sep 35 3042, 00.01 am</span>
                    </div>
                </div>
                <p className="postText">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, labore.
                </p>
                <div className="postAction">
                    <div className="activitiesIcons">
                        <span className="iconAct">120 <ion-icon name="heart-outline"></ion-icon></span>
                        <span className="iconAct">18 <ion-icon name="chatbox-outline"></ion-icon></span>
                        <span className="iconAct">5 <ion-icon name="repeat-outline"></ion-icon></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextPage;
