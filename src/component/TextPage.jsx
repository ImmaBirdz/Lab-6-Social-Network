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
                        </a>

                        <div className="infoPost">
                            <p className='postName'>nAme_user</p>
                            {/* <p className='postDate'>Sep 35 3042, 00.01 am</p> */}
                        </div>

                    </div>

                </div>

                <p className="postText">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, labore.
                </p>

                <div className="postAction">

                    <div className="activitiesIcons">

                        <a href="#"><span className="iconAct">like <ion-icon name="heart-outline"></ion-icon></span></a>
                        <a href="#"></a><span className="iconAct">comment <ion-icon name="chatbox-outline"></ion-icon></span>
                        <a href="#"><span className="iconAct">repost <ion-icon name="repeat-outline"></ion-icon></span></a>

                    </div>

                </div>

            </div>

            <div className="postBox">

                <div className="postedContent">

                    <div className="userProf">

                        <a href="#">
                            <div className="userPics">
                                <img width="40" height="40"
                                    src="https://img.icons8.com/office/40/circled-user-female-skin-type-1-2.png"
                                    alt="User Profile" />
                            </div>
                        </a>

                        <div className="infoPost">
                            <p className='postName'>nAme_user</p>
                            {/* <p className='postDate'>Sep 35 3042, 00.01 am</p> */}
                        </div>

                    </div>

                </div>

                <p className="postText">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, labore.
                </p>

                <div className="postAction">

                    <div className="activitiesIcons">

                        <a href="#"><span className="iconAct">like <ion-icon name="heart-outline"></ion-icon></span></a>
                        <a href="#"></a><span className="iconAct">comment <ion-icon name="chatbox-outline"></ion-icon></span>
                        <a href="#"><span className="iconAct">repost <ion-icon name="repeat-outline"></ion-icon></span></a>

                    </div>

                </div>

            </div>

            <div className="postBox">

                <div className="postedContent">

                    <div className="userProf">

                        <a href="#">
                            <div className="userPics">
                                <img width="40" height="40"
                                    src="https://img.icons8.com/office/40/circled-user-female-skin-type-1-2.png"
                                    alt="User Profile" />
                            </div>
                        </a>

                        <div className="infoPost">
                            <p className='postName'>nAme_user</p>
                            {/* <p className='postDate'>Sep 35 3042, 00.01 am</p> */}
                        </div>

                    </div>

                </div>

                <p className="postText">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, labore.
                </p>

                <div className="postAction">

                    <div className="activitiesIcons">

                        <a href="#"><span className="iconAct">like <ion-icon name="heart-outline"></ion-icon></span></a>
                        <a href="#"></a><span className="iconAct">comment <ion-icon name="chatbox-outline"></ion-icon></span>
                        <a href="#"><span className="iconAct">repost <ion-icon name="repeat-outline"></ion-icon></span></a>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default TextPage;
