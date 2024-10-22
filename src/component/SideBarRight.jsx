import React, { useState } from 'react'
import '../css/Page.css'

const SideBarRight = () => {

    const [isSidebarShown, setIsSidebarShown] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarShown(!isSidebarShown);
    }

    return (
        <div>

            <button className="toggle-sidebar-right" onClick={toggleSidebar}>
                {isSidebarShown ? '✖' : '☰'}
            </button>

            <aside className={`sidebar-right ${isSidebarShown ? 'show' : ''}`}>
                <div className="sidebar-right-content">
                    <h3>Updates</h3>
                    <ul>
                        <li>Update 1</li>
                        <li>Update 2</li>
                        <li>Update 3</li>
                        <li>Update 4</li>
                    </ul>
                </div>
            </aside>

        </div>
    )
}

export default SideBarRight;