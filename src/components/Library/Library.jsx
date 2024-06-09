import React from 'react'
import './Library.css'
import { library, liked, list, plus, search } from '../../assets'
import { PlaylistCard } from '../'
import { useSelector } from 'react-redux';

function Library() {
    const likedSongs = useSelector(state => state.songs.LikedSongs);
    const likedPlaylist = useSelector(state => state.playlists.likedPlaylist)
    const likedAlbum = useSelector(state => state.albums.likedAlbum)
    const combinedList = [
        ...likedPlaylist.map((playlist, index) => ({
            ...playlist,
            type: 'playlist',
            id: playlist.playlistId || index,
            to: `/playlist/${playlist.playlistId}`
        })),
        ...likedAlbum.map((album, index) => ({
            ...album,
            type: 'album',
            id: album.albumId || index,
            to: `/album/${album.albumId}`
        }))
    ];
    combinedList.sort((a, b) => new Date(a.likedAt) - new Date(b.likedAt));
    return (
        <div className='library'>
            <div className="first-child">
                <img src={library} alt="Library" />
                <span>Your Library</span>
                <img src={plus} alt="add" />
            </div>

            <div className="second-child">
                <button className='button'>Playlists</button>
                <button className='button'>Artists</button>
            </div>

            <div className="third-child">
                <img src={search} alt="" />
                <div>
                    <span>Recents</span>
                    <img src={list} alt="" />
                </div>
            </div>

            <div className="VerticalCard">
                <PlaylistCard songCount={likedSongs.length || "0"} name="Your favourite Songs" to='/playlist/Liked' img={liked} />
                {combinedList.map((item, index) => (
            <PlaylistCard
                key={item.id}
                songCount={item.songCount}
                name={item.playlistName}
                to={item.to}
                img={item.imgUrl}
            />
        ))}
            </div>
        </div>
    )
}

export default Library
