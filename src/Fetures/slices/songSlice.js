import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    songs: [
        {
            song:1
        }
    ],
    loading: true
}

export const slice = createSlice({
    name: "songs",
    initialState,
    reducers:{
        updateAllSongs(state, action){
            fetch('https://saavn.dev/api/songs/yDeAS8Eh/suggestions')
            .then(res => res.json())
            .then((data) => {
                data.data.map(song =>
                    state.songs.push(song)
                )
            })
        }
    }
})

export const {updateAllSongs} = slice.actions
export const sliceReducer= slice.reducer