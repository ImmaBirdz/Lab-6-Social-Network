import '../css/Profile.css';
import React from 'react';
import { TabTitle } from './TabTitle';

const Profile = () => {

    TabTitle("Profile | Black Cat with Bow")

    return (
        <div>

            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet" />

            </head>

            <body>

                <div class="bioPart">

                    <div class="goBackTab">
                        <span class="icon">
                            <ion-icon name="caret-back-outline"></ion-icon>
                        </span>
                    </div>

                    <div class="bioBox">

                        <div class="leftBox">
                            <div class="profPic"></div>
                            <div class="accInfo">

                                <div class="nameBox">
                                    <div class="profName">Your Profile Name</div>
                                </div>

                                <div class="bioPfBox">
                                    <div class="accBio">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, labore.
                                    </div>
                                </div>

                                <div class="accBox">
                                    <div class="accProf">@Your Account Profile</div>
                                </div>

                            </div>
                        </div>

                        <div class="rightBox">
                            <div class="accNum">
                                <div class="postNum">0 post</div>
                                <div class="followersNum"> <a href="#">0 followers</a></div>
                                <div class="followingNum"><a href="#">0 following</a></div>
                            </div>
                            <div class="editBtn"><a href="#">Edit Profile</a></div>
                        </div>

                    </div>
                </div>

                <div class="line">
                </div>

                <div class="actionPart">

                    <div class="actionBox">

                        <div class="textBox"><a href="#">Text</a></div>

                        <div class="mediaBox"><a href="#">Media</a></div>

                    </div>

                    <div class="postContainer">

                        <div class="postBox">

                            <div class="postedContent">

                                <div class="userProf">

                                    <a href="#">
                                        <div class="userPics">
                                            <img width="40" height="40"
                                                src="https://img.icons8.com/office/40/circled-user-female-skin-type-1-2.png"
                                                alt="circled-user-female-skin-type-1-2" />
                                        </div>

                                        <p>nAme_user</p>
                                    </a>
                                    <span>Sep 35 3042, 00.01 am</span>

                                </div>

                            </div>

                            <p class="postText">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, labore.
                            </p>

                            <div class="postAction">

                                <div class="activitiesIcons">

                                    <span class="iconAct"> 120
                                        <ion-icon name="heart-outline"></ion-icon>
                                    </span>

                                    <span class="iconAct"> 18
                                        <ion-icon name="chatbox-outline"></ion-icon>
                                    </span>

                                    <span class="iconAct"> 5
                                        <ion-icon name="repeat-outline"></ion-icon>
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="postContainer">

                        <div class="postBox">

                            <div class="postedContent">

                                <div class="userProf">

                                    <a href="#">
                                        <div class="userPics">
                                            <img width="40" height="40"
                                                src="https://img.icons8.com/office/40/circled-user-female-skin-type-1-2.png"
                                                alt="circled-user-female-skin-type-1-2" />
                                        </div>
                                        <p>nAme_user</p>
                                    </a>
                                    <span>Sep 35 3042, 00.01 am</span>

                                </div>

                            </div>

                            <p class="postText">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, labore.
                            </p>

                            <div class="postAction">

                                <div class="activitiesIcons">

                                    <span class="iconAct"> 120
                                        <ion-icon name="heart-outline"></ion-icon>
                                    </span>

                                    <span class="iconAct"> 18
                                        <ion-icon name="chatbox-outline"></ion-icon>
                                    </span>

                                    <span class="iconAct"> 5
                                        <ion-icon name="repeat-outline"></ion-icon>
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="postContainer">

                        <div class="postBox">

                            <div class="postedContent">

                                <div class="userProf">

                                    <a href="#">
                                        <div class="userPics">
                                            <img width="40" height="40"
                                                src="https://img.icons8.com/office/40/circled-user-female-skin-type-1-2.png"
                                                alt="circled-user-female-skin-type-1-2" />
                                        </div>
                                        <p>nAme_user</p>
                                    </a>
                                    <span>Sep 35 3042, 00.01 am</span>

                                </div>

                            </div>

                            <p class="postText">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum, labore.
                            </p>

                            <div class="postAction">

                                <div class="activitiesIcons">

                                    <span class="iconAct"> 120
                                        <ion-icon name="heart-outline"></ion-icon>
                                    </span>

                                    <span class="iconAct"> 18
                                        <ion-icon name="chatbox-outline"></ion-icon>
                                    </span>

                                    <span class="iconAct"> 5
                                        <ion-icon name="repeat-outline"></ion-icon>
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
                <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
            </body>
        </div>
    );
}
