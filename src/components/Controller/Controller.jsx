import React from 'react'
import './Controller.css'
import {PlaylistCard} from '..'
import { next, play, previous, volume } from '../../assets'
function Controller() {
    return (
        <div className='controller'>
            <div className="now-playing">
                <PlaylistCard/>
            </div>

            <div className="controllers">

                <div className="control-btn">
                    <img src={previous} alt="previous" />
                    <img src={play} alt="play" />
                    <img src={next} alt="next" />
                </div>

                <div className="progress-bar">
                <input type="range" />
                </div>
                
            </div>

            <div className="volume">
                <img src={volume} alt="" />
                <div className="progress-bar">
                    <input type="range" />
                </div>

            </div>

        </div>
    )
}

export default Controller
