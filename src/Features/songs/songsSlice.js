import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    LikedSongs: [],
    historySong: [],
};
export const songsSlice = createSlice({
    name: 'LikedSong',
    initialState,
    reducers: {
        addSong: (state, action) => {
            const songExists = state.LikedSongs.some(song => song.id === action.payload);
            if (!songExists) {
                state.LikedSongs.push(action.payload);
            }
        },
        removeSong: (state, action) => {
            state.LikedSongs = state.LikedSongs.filter(song => song.id !== action.payload);
        },
        addToHistory: (state, action)=>{
            if (state.historySong.length >= 30) {
                state.historySong.shift();
            }
            state.historySong.push(action.payload)
                
        },
    },
});

export const { addSong, removeSong, addToHistory } = songsSlice.actions;
export default songsSlice.reducer;
