import React, { useEffect } from 'react'
import '../css/Page.css'
import { TabTitle } from './TabTitle'

const Page = () => {
    useEffect(() => {
        TabTitle("Feed | Black Cat with Bow");
    } , []);

    return (
        <div>
            <body>
                <div className="container">
                    <main className="feed">
                        <div className="new-post">
                            <textarea placeholder="What's on your mind?" rows="3"></textarea>
                            <button>Post</button>
                        </div>

                        <div className="post">
                            <div className="post-header">
                                <img src="avatar.png" alt="User Avatar" />
                                <div>
                                    <h4>User Name</h4>
                                    <p>Just now</p>
                                </div>
                            </div>
                            <p>This is a sample post content...</p>
                        </div>

                        <div className="post">
                            <div className="post-header">
                                <img src="avatar.png" alt="User Avatar" />
                                <div>
                                    <h4>Another User</h4>
                                    <p>5 mins ago</p>
                                </div>
                            </div>
                            <p>Another sample post content...</p>
                        </div>

                        <div className="post">
                            <div className="post-header">
                                <img src="avatar.png" alt="User Avatar" />
                                <div>
                                    <h4>User Name</h4>
                                    <p>Just now</p>
                                </div>
                            </div>
                            <p>This is a sample post content...</p>
                        </div>

                        <div className="post">
                            <div className="post-header">
                                <img src="avatar.png" alt="User Avatar" />
                                <div>
                                    <h4>User Name</h4>
                                    <p>Just now</p>
                                </div>
                            </div>
                            <p>This is a sample post content...</p>
                        </div>

                        <div className="post">
                            <div className="post-header">
                                <img src="avatar.png" alt="User Avatar" />
                                <div>
                                    <h4>User Name</h4>
                                    <p>Just now</p>
                                </div>
                            </div>
                            <p>This is a sample post content...</p>
                        </div>
                    </main>
                </div>
            </body>
        </div>
    );
};

export default Page;
