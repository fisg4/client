import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "../songs/slices/songsSlice";
import lyricsReducer from "../songs/slices/lyricsSlice";

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    lyrics: lyricsReducer,
  },
});
