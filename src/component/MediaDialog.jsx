import React, { useContext } from 'react'
import { LoginContext } from '../variable/LoginContext'
import '../css/MediaDialog.css'

const MediaDialog = () => {
    const { isMediaDialogOpen, setIsMediaDialogOpen, selectedImage, setSelectedImage } = useContext(LoginContext)

    // close media dialog
    const handleCloseMediaDialog = () => {
        setIsMediaDialogOpen(false);
        setSelectedImage('');
    }

    return (
        <>
            {isMediaDialogOpen &&
                <div className="media-dialog" style={{ display: 'flex' }}>
                    <div className="media-dialog-content">
                        <img src={selectedImage} alt="enlarged" />
                        <button onClick={handleCloseMediaDialog}>&#10006;</button>
                    </div>
                </div>
            }
        </>
    )
}

export default MediaDialog