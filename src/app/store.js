import { configureStore } from "@reduxjs/toolkit";
import { songsReducer } from "../songs/slices/songsSlice";

export const store = configureStore({
  reducer: {
    songs: songsReducer,
  },
});
