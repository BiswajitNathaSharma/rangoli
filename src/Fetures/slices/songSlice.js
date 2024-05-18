import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songs: []
}

export const slice = createSlice({
    name: "songs",
    initialState,
    reducers:{
        updateAllSongs(state, action){
            fetch('https://saavn.dev/api/search/playlists?query=Indie')
            .then(res => res.json())
            .then(data => console.log(data))
        }
    }
})

export const {updateAllSongs} = slice.actions
export const sliceReducer= slice.reducer