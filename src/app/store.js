import { configureStore } from "@reduxjs/toolkit";
import { sliceReducer } from "../Fetures/slices/songSlice";
export const store = configureStore({
    reducer: sliceReducer
})