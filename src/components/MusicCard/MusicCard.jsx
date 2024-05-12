import React from 'react'
import './MusicCard.css'
import { play } from '../../assets'
function MusicCard() {
    return (
        <div className='card'>
            <img src="https://plus.unsplash.com/premium_photo-1669050703458-10993eb8fe6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3NXx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div className="play"><img src={play} alt="" /></div>
            <div className="description">
            <h4>album name</h4>
            <h5>description</h5>
            </div>
        </div>
    )
}

export default MusicCard
