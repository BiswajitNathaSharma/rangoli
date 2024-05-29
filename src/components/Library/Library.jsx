import React from 'react'
import './Library.css'
import { library, liked, list, plus, search } from '../../assets'
import {PlaylistCard} from '../'
import { useSelector } from 'react-redux';

function Library() {
    const likedSongs = useSelector(state => state.songs.LikedSongs);
    const likedPlaylist = useSelector(state => state.playlists.likedPlaylist)
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
            <PlaylistCard songCount={likedSongs.length ||"0"} name="Your favourite Songs" to='/playlist/Liked'img={liked}/>
            {
                likedPlaylist.map((playlist) => {
                    return <PlaylistCard 
                    key={playlist.playlistId}
                    songCount={playlist.songCount} 
                    name={playlist.playlistName} 
                    to={`/playlist/${playlist.playlistId}`}
                    img={playlist.imgUrl}/>
                })
            }
            </div>
        </div>
    )
}

export default Library
