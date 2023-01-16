import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  spotify: null,
  query: "",
  queryError: null,
  deleteError: null,
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
    setQueryError: (state, action) => {
      state.queryError = action.payload;
    },
    setDeleteError: (state, action) => {
      state.deleteError = action.payload;
    }
  },
});

export const { setSongs, toggleSpotify, saveQuery, setQueryError, setDeleteError } = songsSlice.actions;

export default songsSlice.reducer;
