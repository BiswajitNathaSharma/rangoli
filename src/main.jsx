import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { HomeSong, Playlist, Search, Song } from './components/index.js'
import PlayerContextProvider from './Context/PlayerContext.jsx'
import { LoadingProvider } from './Context/loadingContext.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='' element={<HomeSong />} />
            <Route path='playlist/:playlistId' element={<Playlist />} />
            <Route path='album/:albumId' element={<Playlist />} />
            <Route path='song/:id' element={<Song/>} />
            <Route path="search/:query" element={<Search />} />
        </Route>
    )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <LoadingProvider>
            <PlayerContextProvider>
                <RouterProvider router={router} />
            </PlayerContextProvider>
        </LoadingProvider>
    </Provider>
)
