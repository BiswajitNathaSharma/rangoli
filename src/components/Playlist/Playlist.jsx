import React, { useEffect, useState } from 'react'
import './Playlist.css'
import { SongsCard } from '../'
import { like } from '../../assets'
import { useParams } from 'react-router-dom'
import fetchWithQuoteConversion from '../../utils/fetchWithQuoteConversion'
import { useSelector } from 'react-redux'
function Playlist() {

    const [playlistName, setPlaylistName] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [discription, setDiscription] = useState("")
    const [songCount, setSongCount] = useState(0)
    const [playlistSongs, setPlaylistSongs] = useState([])
    const { playlistId } = useParams()
    useEffect(() => {
        fetchWithQuoteConversion(`https://saavn.dev/api/playlists?id=${playlistId}&limit=100`)
            .then((data) => {
                if (data.success) {
                    setPlaylistName(data.data.name)
                    setImgUrl(data.data.image[2].url)
                    setDiscription(data.data.description)
                    setSongCount(data.data.songCount)
                    setPlaylistSongs(data.data.songs)
                }
            })
    }, [playlistId])
    const likedSongs = useSelector(state => state.songs.LikedSongs);
    return (
        <div className='playlist'>
            <div className="details">

                <img src={imgUrl} alt={playlistName} />

                <div className="discription">
                    <div className="name">{playlistName}</div>
                    <div className="about">{discription}</div>
                    <div className="song-count">Total songs: {songCount}</div>
                    <div className="buttons">
                        <button>Play</button>
                        <img src={like} alt="" />
                    </div>
                </div>
            </div>
            <div className="songs">
                {
                    playlistSongs.map((song, index) => {
                        const isLiked = likedSongs.some(likedSongs => likedSongs.id === song.id);
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

export default Playlist
