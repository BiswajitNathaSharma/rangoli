import { configureStore } from "@reduxjs/toolkit";
import songReducer from '../Features/songs/songsSlice'
export const store = configureStore({
    reducer:{ 
        songs: songReducer
    },
})