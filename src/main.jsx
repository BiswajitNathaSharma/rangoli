import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Home, HomeSong, Main, Playlist, Song } from './components/index.js'
import PlayerContextProvider from './Context/PlayerContext.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='' element={<HomeSong />} />
            <Route path='playlist/:playlistId' element={<Playlist />} />
            <Route path='song/:id' element={<Song/>} />
        </Route>
    )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <PlayerContextProvider>
        <RouterProvider router={router} />
        </PlayerContextProvider>
    </Provider>
)
