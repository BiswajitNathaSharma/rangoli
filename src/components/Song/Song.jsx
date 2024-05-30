import React, { useContext, useEffect, useState } from 'react'
import './Song.css'
import { dot, like, liked, duration_icon } from '../../assets'
import { SongsCard, Loader } from '../'
import { useParams } from 'react-router-dom'
import fetchWithQuoteConversion from '../../utils/fetchWithQuoteConversion';
import { useDispatch, useSelector } from 'react-redux'
import { addSong, removeSong } from '../../Features/songs/songsSlice'
import convertSecondsToMinutesSeconds from '../../utils/durationCalculator'
import { PlayerContext } from '../../Context/PlayerContext'
import { useLoading } from '../../Context/loadingContext'

function Song() {
    const { isLoading, toggleLoading } = useLoading();
    const { id } = useParams()
    const [imgUrl, setImgUrl] = useState()
    const [songName, setSongName] = useState("")
    const [label, setLabel] = useState("")
    const [album, setAlbum] = useState("")
    const [artists, setArtists] = useState([])
    const [Year, setYear] = useState("")
    const [playCount, setPlayCount] = useState("")
    const [Language, setLanguage] = useState("")
    const [copyright, setCopyright] = useState("")
    const [suggestedSong, setSuggestedSong] = useState([])
    const [duration, setDuration] = useState("")
    const dispatch = useDispatch()
    const { play, playWithId } = useContext(PlayerContext)
    useEffect(() => {
        fetchWithQuoteConversion(`https://saavn.dev/api/songs/${id}`, toggleLoading)
            .then((data) => {
                if (data.success) {
                    data = data.data[0]
                    setSongName(data.name)
                    setImgUrl(data.image)
                    setLabel(data.label)
                    setAlbum(data.album.name)
                    setArtists(data.artists)
                    setPlayCount(data.playCount)
                    setDuration(data.duration)
                    setCopyright(data.copyright)
                    setYear(data.year)
                    setLanguage(data.language)
                }
            })
        fetchWithQuoteConversion(`https://saavn.dev/api/songs/${id}/suggestions?limit=20`, toggleLoading)
            .then((data) => {
                if (data.success) {
                    setSuggestedSong(data.data)
                }
            })
        playWithId(id)
    }, [id])
    const songImg = imgUrl ? imgUrl[2].url : ""
    const songDuration = convertSecondsToMinutesSeconds(duration)
    const likedSongs = useSelector(state => state.songs.LikedSongs);
    const isSongLiked = likedSongs.some(song => song.id === id)
    const handleToggleLike = (e) => {
        e.preventDefault();
        if (isSongLiked) {
            dispatch(removeSong(id));
        } else {
            dispatch(addSong({ id, songName, album, imgUrl, songDuration, artists }));
        }
    };
    return (
        <div className='song'>
            <div className="details">

                <img src={songImg} alt={songName} />

                <div className="song-discription">
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
                        <button onClick={() => play()}>Play</button>
                        <img src={isSongLiked ? liked : like} alt="like" onClick={handleToggleLike} />

                    </div>
                </div>
            </div>
            <div className="songs">

                {
                    isLoading ? <Loader /> : <><h1>You Might Like</h1>
                        <div className='song-card no-selection'>
                            <div className="index-image-name">
                                <span>#</span>
                                <span>Image</span>
                                <span>Name</span>

                            </div>
                            <div className="artist-album">
                                <span>Artists</span>
                                <span>Album</span>

                            </div>
                            <div className="like-duration-more">
                                <span>Like</span>
                                <span><img src={duration_icon} alt="" /></span>
                            </div>
                        </div>
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
                                    imgUrl={song.image}
                                    isLiked={isLiked}
                                />
                            })
                        }</>
                }

            </div>
        </div>
    )
}

export default Song
