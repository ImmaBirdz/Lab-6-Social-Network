import React from 'react'
import '../css/Page.css'

const SideBarRight = ({ isSidebarShown }) => {
    return (
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
    )
}

export default SideBarRight;