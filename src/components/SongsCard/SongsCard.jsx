import React, { useState } from 'react'
import './SongsCard.css'
import { like, liked } from '../../assets'
import { Link } from 'react-router-dom';
import { addSong, removeSong } from '../../Features/songs/songsSlice';
import { useDispatch } from 'react-redux';

function SongsCard({ index, songName, imgUrl, album, duration, artists, id, isLiked}) {
    let artistName = artists.primary.map(artist => artist.name).join(', ')
    const truncatedName = songName.length > 30 ? songName.slice(0, 30) + '...' : songName;
    const trtuncatedAlbum = album.length > 25 ? album.slice(0, 25) + '...' : album;
    const trtuncatedArtistName = artistName.length > 25 ? artistName.slice(0, 25) + '...' : artistName;
    function convertSecondsToMinutesSeconds(duration) {
        const minute = Math.floor(duration / 60)
        const second = duration % 60
        return `${minute}.${second}`
    }
    let songDuration = convertSecondsToMinutesSeconds(duration)

    const dispatch = useDispatch()
    const handleToggleLike = (e) => {
        e.preventDefault();
        if (isLiked) {
            dispatch(removeSong(id));
        } else {
            dispatch(addSong({id, songName, album}));
        }
    };
    return (
        <Link to={`/song/${id}`} className='no-decoration'>
            <div className='song-card'>
                <div className="index-image-name">
                    <span>{index + 1}</span>
                    <img src={imgUrl} alt={songName} />
                    <span>{truncatedName}</span>
                </div>
                <div className="artist-album">
                    <span>{trtuncatedArtistName}</span>
                    <span>{trtuncatedAlbum}</span>
                </div>
                <div className="like-duration-more">
                    <img src={isLiked ? liked : like}  alt="" onClick={handleToggleLike}/>
                    <span>{songDuration}</span>
                </div>
            </div>
        </Link>
    )
}

export default SongsCard
