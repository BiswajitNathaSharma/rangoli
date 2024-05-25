import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    LikedSongs: []
};

export const songsSlice = createSlice({
    name: 'LikedSong',
    initialState,
    reducers: {
        addSong: (state, action) => {
            const songExists = state.LikedSongs.some(song => song.id === action.payload);
            if (!songExists) {
                const song = {
                    id: action.payload,
                };
                state.LikedSongs.push(action.payload);
            }
        },
        removeSong: (state, action) => {
            state.LikedSongs = state.LikedSongs.filter(song => song.id !== action.payload);
        }
    },
});

export const { addSong, removeSong, toggleLike } = songsSlice.actions;
export default songsSlice.reducer;
