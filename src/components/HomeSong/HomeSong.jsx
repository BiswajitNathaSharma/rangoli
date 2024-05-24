import React, { useState, useEffect } from 'react';
import './HomeSong.css';
import { HorizontalCard } from '../index';

const fetchData = async (query, setState) => {
    const response = await fetch(`https://saavn.dev/api/search/playlists?query=${query}&limit=100`);
    const data = await response.json();
    if (data.success) {
        setState(data.data.results);
        localStorage.setItem(query, JSON.stringify(data.data.results));
    } else {
        console.log(data.message);
    }
};

const getDataFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

function HomeSong() {
    const [romanticSong, setRomanticSong] = useState(getDataFromLocalStorage('romantic') || []);
    const [bhajan, setBhajan] = useState(getDataFromLocalStorage('spiritual') || []);
    const [party, setParty] = useState(getDataFromLocalStorage('party') || []);
    const [mostSearched, setMostSearched] = useState(getDataFromLocalStorage('trending') || []);

    useEffect(() => {
        if (romanticSong.length === 0) {
            fetchData('romantic', setRomanticSong);
        }

        if (bhajan.length === 0) {
            fetchData('spiritual', setBhajan);
        }

        if (party.length === 0) {
            fetchData('party', setParty);
        }

        if (mostSearched.length === 0) {
            fetchData('trending', setMostSearched);
        }
    }, [romanticSong, bhajan, party, mostSearched]);

    return (
        <>
            <nav>
                <button className="button">All</button>
                <button className="button">Playlist</button>
                <button className="button">Podcast</button>
            </nav>
            <section>
                <div className="music-section">
                    <h2>Top Romantic</h2>
                    <HorizontalCard category={romanticSong} />
                </div>
                <div className="music-section">
                    <h2>Trending Now</h2>
                    <HorizontalCard category={mostSearched} />
                </div>
                <div className="music-section">
                    <h2>Top Dance</h2>
                    <HorizontalCard category={party} />
                </div>
                <div className="music-section">
                    <h2>Spiritual</h2>
                    <HorizontalCard category={bhajan} />
                </div>
            </section>
        </>
    );
}

export default HomeSong;
