import React, { useContext, useEffect } from 'react'
import './Controller.css'
import { PlaylistCard } from '..'
import { next_icon, play_icon, previous_icon, volume_icon, pause_icon, headphone } from '../../assets'
import { PlayerContext } from '../../Context/PlayerContext'
function Controller() {
    const { seekBar, seekBg, playStatus, setPlayStatus, time, play, pause, track, seekSong, handleMouseDown} = useContext(PlayerContext)
    
    return (
        <div className={track?`controller`:`controller no-track`}>
            <div className="now-playing">
                {
                    track ? <PlaylistCard 
                    name = {track.name}
                    label = {track.label}
                    img={track.image[1].url}
                    to={`/song/${track.id}`}
                />
                :<PlaylistCard 
                name="Select A Song"
                label = "To play"
                img={headphone}/>
                }
                
            </div>

            <div className="controllers">

                <div className="control-btn">
                    <img src={previous_icon} alt="previous" />
                    {
                        playStatus? 
                        <img src={pause_icon} alt="pause" onClick={pause} /> : 
                        <img src={play_icon} alt="play" onClick={play} />
                    }
                    <img src={next_icon} alt="next" />
                </div>

                <div className="player-range">
                    <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                    <div className="progress-bar" ref={seekBg} onClick={seekSong}
                    onMouseDown={handleMouseDown}>
                        <div className="hr-with-dot" ref={seekBar}></div>
                    </div>
                    <p>{time.totalTime.minute}:{time.totalTime.second}</p>
                </div>
            </div>

            <div className="volume" >
                <img src={volume_icon} alt="" />
                {/* <div className="progress-bar"> */}
                {/* <div className="hr-with-dot"></div> */}
                <input type="range" name="" id="" />

                {/* </div> */}

            </div>

        </div>
    )
}

export default Controller
