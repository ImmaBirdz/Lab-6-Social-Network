import React from 'react'
import '../css/Page.css'
import { TabTitle } from './TabTitle'

const Page = () => {
    TabTitle("Feed | Black Cat with Bow");

    return (
        <div>
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Social Feed Page</title>
                <link rel="stylesheet" href="page.css" />
            </head>
            <body>
                <header className="Pnavbar">
                    <div className="logo">Logo</div>
                    <nav className="nav-links">
                        <a href="#">Home</a>
                        <a href="#">Profile</a>
                        <a href="#">Messages</a>
                        <a href="#">Logout</a>
                    </nav>
                </header>

                <div className="Pcontainer">
                    <aside className="sidebar-left">
                        <h3>Menu</h3>
                        <ul>
                            <li><a href="#">Dashboard</a></li>
                            <li><a href="#">Friends</a></li>
                            <li><a href="#">Groups</a></li>
                            <li><a href="#">Settings</a></li>
                        </ul>
                    </aside>

                    <main className="Pfeed">
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
                    </main>

                    <aside className="sidebar-right">
                        <h3>Updates</h3>
                        <ul>
                            <li>Update 1</li>
                            <li>Update 2</li>
                            <li>Update 3</li>
                            <li>Update 4</li>
                        </ul>
                    </aside>
                </div>
            </body>
        </div>
    );
};

export default Page;
