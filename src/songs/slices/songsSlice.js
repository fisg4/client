import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  spotify: null,
  query: "",
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    toggleSpotify: (state, action) => {
      state.spotify = action.payload;
    },
    saveQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { setSongs, toggleSpotify, saveQuery } = songsSlice.actions;

export default songsSlice.reducer;
