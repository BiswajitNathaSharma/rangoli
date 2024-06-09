import React, { useEffect, useState } from 'react'
import './Playlist.css'
import { Loader, SongsCard } from '../'
import { duration_icon, like, liked, likedSong } from '../../assets'
import { useParams } from 'react-router-dom'
import fetchWithQuoteConversion from '../../utils/fetchWithQuoteConversion'
import { useDispatch, useSelector } from 'react-redux'
import { addPlaylist, removePlaylist } from '../../Features/Playlists/playlistSlice'
import { useLoading } from '../../Context/loadingContext';
import { addAlbum, removeAlbum } from '../../Features/Albums/albumSlice'


function Playlist() {

    const [playlistName, setPlaylistName] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [description, setdescription] = useState("")
    const [songCount, setSongCount] = useState(0)
    const [likedSongPlaylist, setLikedSongPlaylist] = useState([])
    const [playlistSongs, setPlaylistSongs] = useState([])
    const [favourite, setFavourite] = useState(false)
    const [isFavourite, setIsFavourite] = useState(false)
    const { playlistId } = useParams()
    const {albumId} = useParams()
    const likedSongs = useSelector(state => state.songs.LikedSongs);
    const likedPlaylist = useSelector(state => state.playlists.likedPlaylist)
    const likedAlbum = useSelector(state => state.albums.likedAlbum)

    const dispatch = useDispatch()
    const isPlaylistLiked = likedPlaylist.some(Playlist => Playlist.playlistId === playlistId)
    const isAlbumLiked = likedAlbum.some(Album => Album.albumId === albumId) 

    const { isLoading, toggleLoading } = useLoading();

    // console.log("album",isAlbumLiked)
    // console.log("playlist",isPlaylistLiked)
    const handleToggleLike = (e) => {
        console.log(isAlbumLiked)
        e.preventDefault();
        if (albumId) {
            if (isAlbumLiked) {
                dispatch(removeAlbum(albumId));
            } else {
                dispatch(addAlbum({ albumId, playlistName, songCount, imgUrl }));
            }
        }
        if(playlistId) {
            if (isPlaylistLiked) {
                dispatch(removePlaylist(playlistId));
            } else {
                dispatch(addPlaylist({ playlistId, playlistName, songCount, imgUrl }));
            }
        }
    };
    useEffect(() => {
        if (playlistId === "Liked") {
            setPlaylistName("Liked Songs")
            setImgUrl(likedSong)
            setdescription("Songs that are liked by you")
            setSongCount(likedSongs.length)
            setLikedSongPlaylist(likedSongs)
            setFavourite(true)

        }else if (albumId) {
            fetchWithQuoteConversion(`https://saavn.dev/api/albums?id=${albumId}`, toggleLoading)
            .then((data) => {
                if (data.success) {
                    setPlaylistName(data.data.name)
                    setImgUrl(data.data.image[2].url)
                    setdescription(data.data.description)
                    setSongCount(data.data.songCount)
                    setPlaylistSongs(data.data.songs)
                    setFavourite(false)
                }
            })
        } else fetchWithQuoteConversion(`https://saavn.dev/api/playlists?id=${playlistId}&limit=100`, toggleLoading)
            .then((data) => {
                if (data.success) {
                    setPlaylistName(data.data.name)
                    setImgUrl(data.data.image[2].url)
                    setdescription(data.data.description)
                    setSongCount(data.data.songCount)
                    setPlaylistSongs(data.data.songs)
                    setFavourite(false)
                }
            })
    }, [playlistId, albumId])
    return (
        <>
            <div className='playlist'>
                <div className="details">

                    <img src={imgUrl} alt={playlistName} />

                    <div className="description">
                        <div className="name">{playlistName}</div>
                        <div className="about">{description}</div>
                        <div className="song-count">Total songs: {songCount}</div>
                        <div className="buttons">
                            <button>Play</button>
                            <img src={isPlaylistLiked || isAlbumLiked || favourite ? liked : like} alt="" onClick={handleToggleLike} />
                        </div>
                    </div>
                </div>
                <div className="songs">
                    {
                        isLoading ? <Loader /> : <>
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
                            {!favourite ?
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
                        </>
                    }
                </div>

            </div>
        </>
    )
}

export default Playlist
