import React from 'react'
import './PlaylistCard.css'
import { Link } from 'react-router-dom'
// import { headphone } from '../../assets/images/headphone.png'
function PlaylistCard({name="PlayList", songCount, to, img="", label="Song Label"}) {
    return (
        <Link to={to} className='no-decoration'>
        <div className='PlaylistCard'>
        <img src={img} alt="" />
            <div className="description">
                <h4>{name.length > 20 ? name.slice(0, 20) + '...' : name}</h4>
                {
                    songCount ? <h5>{songCount} songs</h5>:<h5>{label.length > 20 ? label.slice(0, 20) + '...' : label}</h5>
                }
            </div>
        </div>
        </Link>
    )
}

export default PlaylistCard
