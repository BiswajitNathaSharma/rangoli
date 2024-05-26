import React from 'react'
import './PlaylistCard.css'
import { Link } from 'react-router-dom'
function PlaylistCard({name="PlayList", songCount=100, to, img="https://images.unsplash.com/photo-1527266646048-9c840858b0c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVsaXZlcnxlbnwwfHwwfHx8MA%3D%3D"}) {
    return (
        <Link to={to} className='no-decoration'>
        <div className='PlaylistCard'>
            <div className="image-box">
        <img src={img} alt="" />
            </div>
            <div className="description">
                <h4>{name}</h4>
                <h5>{songCount} songs</h5>
                
            </div>
        </div>
        </Link>
    )
}

export default PlaylistCard
