import '../css/Profile.css';
import '../css/mediaPage.css';
import React, { useState, useEffect } from 'react';
import { TabTitle } from './TabTitle';

export const mediaPage = () => {
    TabTitle("Media | Black Cat with Bow");
    return (<div>

        <div className="mediaContain">

            <div class="mediaContainer">

                <div class="mediaContent">
                    <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                </div>

                <div class="mediaContent">
                    <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                </div>

                <div class="mediaContent">
                    <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                </div>

                <div class="mediaContent">
                    <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                </div>

                <div class="mediaContent">
                    <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                </div>

                <div class="mediaContent">
                    <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                </div>

                <div class="mediaContent">
                    <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                </div>

                <div class="mediaContent">
                    <a href="#"><img src="frogMeme.jpg" alt="frogMeme"></img></a>
                </div>

            </div>

        </div>

    </div>);
};

export default mediaPage;   