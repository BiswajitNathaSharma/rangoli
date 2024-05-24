import './App.css'
import { Sidebar, Main, Controller} from './components'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <>
    <div className="body">
      <Sidebar/>
      <Main/>
      <Controller/>
    </div>
    </>
  )
}

export default App
