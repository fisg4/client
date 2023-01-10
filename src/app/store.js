import { combineReducers, configureStore } from "@reduxjs/toolkit";
import songsReducer from "../songs/slices/songsSlice";

const rootReducer = combineReducers({
  songs: songsReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
