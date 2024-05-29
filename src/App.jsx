import { useContext, useEffect } from 'react'
import './App.css'
import { PlayerContext } from './Context/PlayerContext'
import { Sidebar, Main, Controller, Loader } from './components'
import { useLoading } from './Context/loadingContext'
function App() {
  const {isLoading, isOnline}= useLoading()
  const { audioRef, trackSrc, track } = useContext(PlayerContext)

return (
    <div className="body">
      {!isOnline ? 
      <Loader wifi={true}/> : 
      <></>
      }
      <>
      <Sidebar />
      <Main />
      <Controller />
      {
        track?
      <audio ref={audioRef} preload='auto'  src={trackSrc} ></audio>
        : null
      }
      </>
    </div>
  )
}

export default App
