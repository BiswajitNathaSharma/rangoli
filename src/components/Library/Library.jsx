import React from 'react'
import './Library.css'
import { library, list, plus, search } from '../../assets'
import {VerticalCard} from '../index'

function Library() {
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

            
                <VerticalCard/>
            
        </div>
    )
}

export default Library
