import React from 'react'
import './PlaylistCard.css'
function PlaylistCard() {
    return (
        <div className='PlaylistCard'>
            <img src="https://images.unsplash.com/photo-1527266646048-9c840858b0c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVsaXZlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
            <div className="description">
                <span>playlist name</span>
                <br />
                <span>playlist type</span>
            </div>
        </div>
    )
}

export default PlaylistCard
