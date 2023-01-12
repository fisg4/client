import { combineReducers, configureStore } from "@reduxjs/toolkit";
import songsReducer from "../songs/slices/songsSlice";
import lyricsReducer from "../songs/slices/lyricsSlice";
import roomsReducer from "../messages/slices/roomsSlice";

const rootReducer = combineReducers({
  songs: songsReducer,
  lyrics: lyricsReducer,
  rooms: roomsReducer
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
