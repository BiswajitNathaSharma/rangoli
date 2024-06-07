import React, { useContext, useEffect, useRef } from 'react'
import './Controller.css'
import { PlaylistCard } from '..'
import { next_icon, play_icon, previous_icon, volume_icon, pause_icon, headphone, muted_icon, loud_icon, low_vol } from '../../assets'
import { PlayerContext } from '../../Context/PlayerContext'
function Controller() {
    const { seekBar, seekBg, playStatus, time, play, pause, track, seekSong, handleMouseDown, volume, setVolume } = useContext(PlayerContext)
    const volumeRef = useRef()
    let currentVolumeIcon = volume_icon

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
        volumeRef.current.style.setProperty('--value', `${volume * 100}%`);
    };
    useEffect(() => {
        // Set initial value
        volumeRef.current.style.setProperty('--value', `${volume * 100}%`);
    }, [volume]);

    if (volume == 0) currentVolumeIcon = muted_icon
    else if (volume < 0.3) currentVolumeIcon = low_vol
    else if (volume > 0.7) currentVolumeIcon = loud_icon
    return (
        <div className={track ? `controller` : `controller no-track`}>
            <div className="now-playing">
                {
                    track ? <PlaylistCard
                        name={track.name}
                        label={track.label}
                        img={track.image[1].url}
                        to={`/song/${track.id}`}
                    />
                        : <PlaylistCard
                            name="Select A Song"
                            label="To play"
                            img={headphone} />
                }

            </div>

            <div className="controllers">

                <div className="control-btn">
                    <img src={previous_icon} alt="previous" />
                    {
                        playStatus ?
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
                <img
                    src={currentVolumeIcon} alt=""
                    onClick={() => { volume == 0 ? setVolume(0.5) : setVolume(0) }}
                    onDoubleClick={() => { setVolume(1) }} />
                <input ref={volumeRef} type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />

            </div>

        </div>
    )
}

export default Controller
