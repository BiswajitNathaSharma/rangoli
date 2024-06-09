import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likedPlaylist: []
}

export const playlistSlice=createSlice({
    name:"LikedPlaylist",
    initialState: initialState,
    reducers: {
        addPlaylist: (state, action) => {
            const playlistExists = state.likedPlaylist.some(playlist => playlist.playlistId === action.payload.playlistId);
            if (!playlistExists) {
                state.likedPlaylist.push({...action.payload, likedAt: new Date().toISOString()});
            }
        },
        removePlaylist: (state, action) => {
            state.likedPlaylist = state.likedPlaylist.filter(playlist => playlist.playlistId !== action.payload);
        }
    },
})
export const {addPlaylist, removePlaylist} = playlistSlice.actions 
export default playlistSlice.reducer