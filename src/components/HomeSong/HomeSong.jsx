import React, { useState, useEffect } from 'react';
import './HomeSong.css';
import { History, HorizontalCard } from '../index';
import fetchWithQuoteConversion from '../../utils/fetchWithQuoteConversion';
import { useLoading } from '../../Context/loadingContext';
import { useSelector } from 'react-redux';


function HomeSong() {
    const { toggleLoading } = useLoading();

    const fetchData = async (query, setState) => {
        const data = await fetchWithQuoteConversion(`https://saavn.dev/api/search/playlists?query=${query}&limit=100`, toggleLoading);
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
    const [romanticSong, setRomanticSong] = useState(getDataFromLocalStorage('romantic') || []);
    const [topChart, settopChart] = useState(getDataFromLocalStorage('top 50') || [])
    const [bhajan, setBhajan] = useState(getDataFromLocalStorage('spiritual') || []);
    const [party, setParty] = useState(getDataFromLocalStorage('party') || []);
    const [mostSearched, setMostSearched] = useState(getDataFromLocalStorage('trending') || []);

    useEffect(() => {
        if (romanticSong.length === 0) {
            fetchData('romantic', setRomanticSong);
        }
        if(topChart.length === 0){
            fetchData('top 50', settopChart);
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
    const history = useSelector(State => State.songs.historySong)
    return (
        <>
            <nav>
                <button className="button">All</button>
                <button className="button">Playlist</button>
                <button className="button">Podcast</button>
            </nav>
            <section>
                {history.length > 1 ? <div className="music-section">
                    <h2>Last Session</h2>
                    <History />
                </div> : null}

                <div className="music-section">
                    <h2>Top Charts</h2>
                    <HorizontalCard category={topChart} />
                </div>
                <div className="music-section">
                    <h2>Top Romantic</h2>
                    <HorizontalCard category={romanticSong} />
                </div>
                <div className="music-section">
                    <h2>Trending Now</h2>
                    <HorizontalCard category={mostSearched} />
                </div>
                <div className="music-section">
                    <h2>Top Party</h2>
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
