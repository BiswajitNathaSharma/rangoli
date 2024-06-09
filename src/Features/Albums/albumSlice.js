import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likedAlbum: []
}

export const albumSlice=createSlice({
    name:"likedAlbum",
    initialState: initialState,
    reducers: {
        addAlbum: (state, action) => {
            const albumExists = state.likedAlbum.some(album => album.albumId === action.payload.albumId);
            if (!albumExists) {
                state.likedAlbum.push(action.payload);
            }
        },
        removeAlbum: (state, action) => {
            state.likedAlbum = state.likedAlbum.filter(album => album.albumId !== action.payload);
        }
    },
})
export const {addAlbum, removeAlbum} = albumSlice.actions 
export default albumSlice.reducer