import { useContext, useEffect } from 'react'
import './App.css'
import { PlayerContext } from './Context/PlayerContext'
import { Sidebar, Main, Controller } from './components'
function App() {
  const { audioRef, trackSrc, track } = useContext(PlayerContext)

return (
    <div className="body">
      <Sidebar />
      <Main />
      <Controller />
      {
        track?
      <audio ref={audioRef} preload='auto'  src={trackSrc} ></audio>
        : null
      }
    </div>
  )
}

export default App
