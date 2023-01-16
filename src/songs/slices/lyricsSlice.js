import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lyrics: "",
  input: "",
  lyricsRequestError: null,
};

export const lyricsSlice = createSlice({
  name: "lyrics",
  initialState,
  reducers: {
    setLyrics: (state, action) => {
      state.lyrics = action.payload;
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setLyricsRequestError: (state, action) => {
      state.lyricsRequestError = action.payload;
    }
  },
});

export const { setLyrics, setInput, setLyricsRequestError } = lyricsSlice.actions;

export default lyricsSlice.reducer;
