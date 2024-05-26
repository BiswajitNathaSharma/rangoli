import React, { useEffect, useState } from 'react'
import './Playlist.css'
import { SongsCard } from '../'
import { like, likedSong } from '../../assets'
import { useParams } from 'react-router-dom'
import fetchWithQuoteConversion from '../../utils/fetchWithQuoteConversion'
import { useSelector } from 'react-redux'
function Playlist() {

    const [playlistName, setPlaylistName] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [discription, setDiscription] = useState("")
    const [songCount, setSongCount] = useState(0)
    const [likedSongPlaylist, setLikedSongPlaylist] = useState([])
    const [playlistSongs, setPlaylistSongs] = useState([])
    const [favourite, setFavourite] = useState(false)
    const { playlistId } = useParams()
    const likedSongs = useSelector(state => state.songs.LikedSongs);
    
    useEffect(() => {
        if (playlistId==="Liked") {
                    setPlaylistName("Liked Songs")
                    setImgUrl(likedSong)
                    setDiscription("Songs that are liked by you")
                    setSongCount(likedSongs.length)
                    setLikedSongPlaylist(likedSongs)
                    setFavourite(true)
                    
        }else fetchWithQuoteConversion(`https://saavn.dev/api/playlists?id=${playlistId}&limit=100`)
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
                { !favourite ?
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
                            imgUrl={song.image}
                            isLiked={isLiked}
                        />
                    })
                    :
                    likedSongPlaylist.map((song, index) => {
                        const isLiked = likedSongs.some(likedSongs => likedSongs.id === song.id);
                        return <SongsCard
                            key={song.id}
                            id={song.id}
                            index={index}
                            songName={song.songName}
                            duration={song.duration}
                            artists={song.artists}
                            album={song.album}
                            imgUrl={song.imgUrl}
                            isLiked={isLiked}
                            isFavourite={favourite}
                        />
                    })
                }
            </div>
            
        </div>
    )
}

export default Playlist
