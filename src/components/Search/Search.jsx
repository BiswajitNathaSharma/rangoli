import React, { useEffect, useState } from 'react'
import "./Search.css"
import { Artist, HorizontalCard, MusicCard, SongsCard } from '../'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import fetchWithQuoteConversion from '../../utils/fetchWithQuoteConversion';
import { useLoading } from '../../Context/loadingContext';
function Search() {
    const { toggleLoading } = useLoading();

    const likedSongs = useSelector(state => state.songs.LikedSongs);
    const { query } = useParams()
    const [topQuery, setTopQuery] = useState()
    const [songResult, setSongResult] = useState()
    const [playlistResult, setPlaylistResult] = useState()
    const [albumResult, setAlbumResult] = useState()
    const searchUrl = `https://saavn.dev/api/search?query=${query}`
    useEffect(() => {
        fetchWithQuoteConversion(searchUrl, toggleLoading)
            .then((response) => {
                if (response.success) {
                    let data = response.data
                    if (data.topQuery.results.length > 0) {
                        let topQueryData = data.topQuery.results
                        setTopQuery(topQueryData[0])
                    }
                    if (data.songs.results.length > 0) {
                        setSongResult(data.songs.results)
                    }
                    if (data.playlists.results.length > 0) {
                        setPlaylistResult(data.playlists.results)
                    }
                    if (data.albums.results.length > 0) {
                        setAlbumResult(data.albums.results)
                    }
                }
            })
    }, [query])
    return (
        <div className='search'>
            <div className="topResult-songs">
                {topQuery ? <div className="topResult">
                    <img src={topQuery.image[2].url || ""} alt="" />
                    <div className="search-details">
                        <div>Title: {topQuery.title}</div>
                        <div>About: {topQuery.description}</div>
                        <div>Type: {topQuery.type}</div>
                    </div>
                </div> : null}

                <div className="resultSong">
                    {songResult ? songResult.map((song, index) => {
                        return <SongsCard
                            key={song.id}
                            id={song.id}
                            index={index}
                            songName={song.title}
                            duration={song.duration}
                            album={song.album}
                            artists={song.artists}
                            imgUrl={song.image}
                            search={true}
                        />
                    }) : null}
                </div>
            </div>
            {
                albumResult ? 
                <div className="albums">
                    <h2>Album</h2>
                    <HorizontalCard category={albumResult} />
                </div> : null
            }
            {
                playlistResult ? <div className="playlists">
                    <h2>Playlist</h2>
                    <HorizontalCard category={playlistResult} />
                </div> : null
            }
            
        </div>
    )
}

export default Search
