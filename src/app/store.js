import { configureStore } from "@reduxjs/toolkit";
import songsReducer from '../Features/songs/songsSlice'
const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('likedSongs', serializedState);
    } catch (e) {
        console.error("Could not save state", e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('likedSongs');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.error("Could not load state", e);
        return undefined;
    }
};

export const store = configureStore({
    reducer: {
        songs: songsReducer,
    },
    preloadedState: {
        songs: loadFromLocalStorage(),
    },
});

store.subscribe(() => {
    saveToLocalStorage(store.getState().songs);
});
