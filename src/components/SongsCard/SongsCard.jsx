import React, { useState } from 'react'
import './SongsCard.css'
import { like, liked } from '../../assets'
import { Link } from 'react-router-dom';
import { addSong, removeSong } from '../../Features/songs/songsSlice';
import { useDispatch, useSelector } from 'react-redux';
import convertSecondsToMinutesSeconds from '../../utils/durationCalculator';
import artistsName from '../../utils/artistString';

function SongsCard({ index, songName, imgUrl, album, duration, artists, id, isLiked, search }) {

    let songImgUrl = imgUrl[1].url
    let trtuncatedArtistName = artists ? artistsName(artists).length > 25 ? artistsName(artists).slice(0, 25) + '...' : artistsName(artists) : artists;

    let truncatedName = songName.length > 30 ? songName.slice(0, 30) + '...' : songName;
    let trtuncatedAlbum = album.length > 25 ? album.slice(0, 25) + '...' : album;
    let songDuration = duration ? convertSecondsToMinutesSeconds(duration) : ""


    const dispatch = useDispatch()
    
    const handleToggleLike = (e) => {
        e.preventDefault();
        if (isLiked) {
            dispatch(removeSong(id));
        } else {
            dispatch(addSong({ id, songName, album, imgUrl, duration, artists }));
        }
    };
    
    return (
        <>{
            search ? <Link to={`/song/${id}`} className='no-decoration'>
            <div className='song-card search-songs'>
                <div className="index-image-name">
                    <img src={songImgUrl} alt={songName} />
                    <span>{ truncatedName}</span>
                </div>
                <div className="artist-album">
                    <span>{album}</span>
                    <img src={isLiked ? liked : like} alt="" onClick={handleToggleLike} />

                </div>
            </div>
        </Link>
        :
        <Link to={`/song/${id}`} className='no-decoration'>
            <div className='song-card'>
                <div className="index-image-name">
                    <span>{index + 1}</span>
                    <img src={songImgUrl} alt={songName} />
                    <span>{truncatedName ? truncatedName : songName}</span>

                </div>
                <div className="artist-album">
                    <span>{trtuncatedArtistName}</span>
                    <span>{trtuncatedAlbum ? trtuncatedAlbum : album}</span>

                </div>
                <div className="like-duration-more">
                    <img src={isLiked ? liked : like} alt="" onClick={handleToggleLike} />
                    <span>{songDuration}</span>
                </div>
            </div>
        </Link>
        }</>
    )
}

export default SongsCard
