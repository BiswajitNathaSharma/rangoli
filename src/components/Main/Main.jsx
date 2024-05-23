import React, { useEffect, useState } from 'react'
import './Main.css'
import { HorizontalCard } from '../index'
function Main() {
    const [romanticSong, setRomanticSong] = useState([])
    const [bhajan, setBhajan] = useState([])
    const [party, setParty] = useState([])
    const [mostSearched, setMostSearched] = useState([])
    useEffect(() => {
        fetch("https://saavn.dev/api/search/playlists?query=romantic")
            .then(res => res.json())
            .then((data) => {
                data.success ? setRomanticSong(data.data.results) : console.log(data.message)
            })

        fetch("https://saavn.dev/api/search/playlists?query=spiritual ")
            .then(res => res.json())
            .then((data) => {
                data.success ? setBhajan(data.data.results) : console.log(data.message)
            })

        fetch("https://saavn.dev/api/search/playlists?query=party ")
            .then(res => res.json())
            .then((data) => {
                data.success ? setParty(data.data.results) : console.log(data.message)
            })

        fetch("https://saavn.dev/api/search/playlists?query=trending")
            .then(res => res.json())
            .then((data) => {
                data.success ? setMostSearched(data.data.results) : console.log(data.message)
            })


    }, [])
    console.log(romanticSong)
if(romanticSong.length>0) {
    return (
        <div className='main'>
            <nav>
                <button className="button">All</button>
                <button className="button">Playlist</button>
                <button className="button">Podcast</button>
            </nav>
            <section>
                <div className="music-section">
                    <h2>Top Romantic</h2>
                    <HorizontalCard category={romanticSong}/>
                </div>
                <div className="music-section">
                    <h2>Trending Now</h2>
                    <HorizontalCard category={mostSearched}/>
                </div>
                <div className="music-section">
                    <h2>Top Dance </h2>
                    <HorizontalCard category={party}/>
                </div>
                <div className="music-section">
                    <h2>Spiritual </h2>
                    <HorizontalCard category={bhajan}/>
                </div>
            </section>
        </div>)
}}

export default Main
