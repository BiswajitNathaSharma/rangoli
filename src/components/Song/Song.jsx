import React, { useEffect, useState } from 'react'
import './Song.css'
import { dot, like, liked } from '../../assets'
import SongsCard from '../SongsCard/SongsCard'
import { useParams } from 'react-router-dom'
import fetchWithQuoteConversion from '../../utils/fetchWithQuoteConversion';
import { useDispatch, useSelector } from 'react-redux'
import { addSong, removeSong } from '../../Features/songs/songsSlice'

function Song() {
    const { songId } = useParams()
    const [imgUrl, setImgUrl] = useState("")
    const [songName, setSongName] = useState("")
    const [label, setLabel] = useState("")
    const [album, setAlbum] = useState("")
    const [Year, setYear] = useState("")
    const [playCount, setPlayCount] = useState("")
    const [Language, setLanguage] = useState("")
    const [copyright, setCopyright] = useState("")
    const [suggestedSong, setSuggestedSong] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        fetchWithQuoteConversion(`https://saavn.dev/api/songs/${songId}`)
            .then((data) => {
                if (data.success) {
                    data = data.data[0]
                    setSongName(data.name)
                    setImgUrl(data.image[2].url)
                    setLabel(data.label)
                    setAlbum(data.album.name)
                    setPlayCount(data.playCount)
                    setCopyright(data.copyright)
                    setYear(data.year)
                    setLanguage(data.language)
                }
            })
        fetchWithQuoteConversion(`https://saavn.dev/api/songs/${songId}/suggestions?limit=20`)
            .then((data) => {
                if (data.success) {
                    setSuggestedSong(data.data)
                }
            })
    }, [songId])
    const likedSongs = useSelector(state => state.songs.LikedSongs);

    const isSongLiked = likedSongs.some(song => song.songId === songId);
console.log(likedSongs)
    console.log(isSongLiked)
    const handleToggleLike = (e) => {
        e.preventDefault();
        if (isSongLiked) {
            dispatch(removeSong(songId));
        } else {
            dispatch(addSong({songId, songName, album}));
        }
    };

    return (
        <div className='song'>
            <div className="details">

                <img src={imgUrl} alt={songName} />

                <div className="discription">
                    <div className="name">{songName}</div>
                    <div className="about">
                        <span>Song By {label}</span>
                        <br />
                        <br />
                        <span>Album: {album}</span>
                    </div>
                    
                    <div className="minor-details">
                        <span>{Year}</span>
                        <img src={dot} alt="" />
                        <span>{playCount} plays</span>
                        <img src={dot} alt="" />
                        <span>{Language}</span>
                    </div>
                    <div className="copyright">{copyright}</div>
                    <div className="buttons">
                        <button>Play</button>
                        <img src={isSongLiked ? liked : like} alt="like" onClick={handleToggleLike} />

                    </div>
                </div>
            </div>
            <div className="songs">
                {
                    suggestedSong.map((song, index) => {
                        const isLiked = likedSongs.some(likedSong => likedSong.id === song.id);

                        return <SongsCard
                            key={song.id}
                            id={song.id}
                            index={index}
                            songName={song.name}
                            duration={song.duration}
                            artists={song.artists}
                            album={song.album.name}
                            imgUrl={song.image[1].url}
                            isLiked={isLiked}
                        />
                    })
                }
            </div>
        </div>
    )
}

export default Song
