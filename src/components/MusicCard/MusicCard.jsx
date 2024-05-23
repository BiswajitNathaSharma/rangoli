import React from 'react'
import './MusicCard.css'
import { play } from '../../assets'
function MusicCard({name,songCount, img}) {
    const truncatedName = name.length > 20 ? name.slice(0, 20) + '...' : name;
    console.log({name, img, songCount})
    return (
        <div className='card' title={name}>
            <img src={img} alt="SONG" />
            <div className="play"><img src={play} alt="" /></div>
            <div className="description">
            <h4>{truncatedName}</h4>
            <h5>Song Count:&nbsp;&nbsp;{songCount}</h5>
            </div>
        </div>
    )
}

export default MusicCard
