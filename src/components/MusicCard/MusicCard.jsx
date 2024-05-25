import React from 'react'
import './MusicCard.css'
import { play } from '../../assets'
import { Link } from 'react-router-dom';
function MusicCard({name,songCount, img, id}) {
    const truncatedName = name.length > 20 ? name.slice(0, 20) + '...' : name;
    return (
        <div className='card' title={name}>
            <img src={img} alt={name} />
            <div className="play"><img src={play} alt="" /></div>
            <Link to={`/playlist/${id}`} className='no-decoration'>
            <div className="description">
            <h4>{truncatedName}</h4>
            <h5>Song Count:&nbsp;&nbsp;{songCount}</h5>
            </div>
            </Link>
        </div>
    )
}

export default MusicCard
