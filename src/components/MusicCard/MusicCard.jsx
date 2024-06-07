import React, { useEffect, useState } from 'react'
import './MusicCard.css'
import { play_icon } from '../../assets'
import { Link } from 'react-router-dom';
function MusicCard({ name="song Name", songCount="100", img="https://c.saavncdn.com/artists/Vishal_Mishra_004_20230804115745_500x500.jpg", id=0, songLanguage, type}) {
    const truncatedName = name.length > 20 ? name.slice(0, 20) + '...' : name;
    const [url, setUrl] = useState(`/playlist/${id}`)
    
    useEffect(() => {
        type === "album" ? setUrl(`/${type}/${id}`) : null

    }, [type])
    
    
    return (
        <div className='card' title={name}>
            <img src={img} alt={name} />
            <div className="play"><img src={play_icon} alt="" /></div>
            <Link to={url} className='no-decoration'>
                <div className="description">
                    <h4>{truncatedName}</h4>
                    {
                        songLanguage ?
                        <h5>Language: {songLanguage}</h5>: <h5>Song Count:&nbsp;&nbsp;{songCount}</h5>}
                </div>
            </Link>
        </div>
    )
}

export default MusicCard
