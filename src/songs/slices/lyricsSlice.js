import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lyrics: "",
  input: "",
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
  },
});

export const { setLyrics, setInput } = lyricsSlice.actions;

export default lyricsSlice.reducer;
