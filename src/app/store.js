import { combineReducers, configureStore } from "@reduxjs/toolkit";
import songsReducer from "../songs/slices/songsSlice";
import roomsReducer from "../messages/slices/roomsSlice";

const rootReducer = combineReducers({
  songs: songsReducer,
  rooms: roomsReducer
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
