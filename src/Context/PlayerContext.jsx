import { createContext, useEffect, useRef, useState } from "react";
import fetchWithQuoteConversion from "../utils/fetchWithQuoteConversion";
import { useDispatch } from "react-redux";
import { addToHistory } from "../Features/songs/songsSlice";
import { useLoading } from "./loadingContext";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const { toggleLoading } = useLoading();
    const dispatch = useDispatch()

    const audioRef = useRef();
    const seekBar = useRef()
    const seekBg = useRef()

    const [track, setTrack] = useState()
    const [trackSrc, setTrackSrc] = useState("")
    const [playStatus, setPlayStatus] = useState(false)
    const [dragging, setDragging] = useState(false);
    const [volume, setVolume] = useState(0.5); // Initial volume at 50%
    const [time, setTime] = useState({
        currentTime: {
            second: "00",
            minute: "00"
        },
        totalTime: {
            second: "00",
            minute: "00"
        }
    })

    useEffect(() => {
        if (audioRef.current) {
        audioRef.current.volume = volume;
        }
    }, [volume]);

    function play() {
        audioRef.current.play()
        setPlayStatus(true)
    }
    function pause() {
        audioRef.current.pause()
        setPlayStatus(false)
    }

    function seekSong(e) {
        const seekPosition = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
        audioRef.current.currentTime = seekPosition
    }

    const calculateSeekPosition = (e) => {
        const seekBgRect = seekBg.current.getBoundingClientRect();
        const offsetX = e.clientX - seekBgRect.left;
        const seekPosition = (offsetX / seekBgRect.width) * audioRef.current.duration;
        audioRef.current.currentTime = Math.min(Math.max(seekPosition, 0), audioRef.current.duration);
    };

    const handleMouseDown = (e) => {
        setDragging(true);
        calculateSeekPosition(e);
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            calculateSeekPosition(e);
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);
    useEffect(() => {
        if (track) {
            setTimeout(() => {
                audioRef.current.ontimeupdate = () => {

                    seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%"
                    setTime({
                        currentTime: {
                            second: Math.floor(audioRef.current.currentTime % 60) < 10 ? `0${Math.floor(audioRef.current.currentTime % 60)}` : Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60) < 10 ? `0${Math.floor(audioRef.current.currentTime / 60)}` : Math.floor(audioRef.current.currentTime / 60)
                        },
                        totalTime: {
                            second: Math.floor(audioRef.current.duration % 60) < 10 ? `0${Math.floor(audioRef.current.duration % 60)}` : Math.floor(audioRef.current.duration % 60),
                            minute: Math.floor(audioRef.current.duration / 60) < 10 ? `0${Math.floor(audioRef.current.duration / 60)}` : Math.floor(audioRef.current.duration / 60)
                        }
                    })
                }
                dispatch(addToHistory(track))

                // audioRef.current.play()
                // setPlayStatus(true)
            }, 500)
        }


    }, [audioRef, track])

    const playWithId = async (id) => {
        await fetchWithQuoteConversion(`https://saavn.dev/api/songs/${id}`, toggleLoading)
            .then((data) => {
                if (data.success) {
                    data = data.data[0]
                    setTrack(data)
                    setTrackSrc(data.downloadUrl[4].url)
                    setPlayStatus(true)
                }
            })
    }

    const contextValue = {
        audioRef,
        seekBar, seekBg,
        track, setTrack, trackSrc,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        seekSong, handleMouseDown,
        dragging, setDragging,
        volume, setVolume,
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
