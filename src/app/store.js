import { combineReducers, configureStore } from "@reduxjs/toolkit";
import songsReducer from "../songs/slices/songsSlice";
import songMediaReducer from "../songs/slices/songMediaSlice";
import lyricsReducer from "../songs/slices/lyricsSlice";
import likesReducer from "../songs/slices/likesSlice";
import roomsReducer from "../messages/slices/roomsSlice";

const rootReducer = combineReducers({
  songs: songsReducer,
  songMedia: songMediaReducer,
  lyrics: lyricsReducer,
  likes: likesReducer,
  rooms: roomsReducer
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
