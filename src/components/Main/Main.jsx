import React, { useEffect } from 'react'
import './Main.css'
import { HorizontalCard } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { updateAllSongs } from '../../Fetures/slices/songSlice'
function Main() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateAllSongs())
    }, [])
    
    useSelector(state => console.log(state))
    return (
        <div className='main'>
            <nav>
                <button className="button">All</button>
                <button className="button">Playlist</button>
                <button className="button">Podcast</button>
            </nav>
            <section>
                <div className="music-section">
                    <h2>Popular Radio</h2>
                    <HorizontalCard />
                </div>
                <div className="music-section">
                    <h2>Popular Radio</h2>
                    <HorizontalCard />
                </div>
                <div className="music-section">
                    <h2>Popular Radio</h2>
                    <HorizontalCard />
                </div>
            </section>
        </div>
    )
}

export default Main
