import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  audioUrl: "",
  videoUrl: "",
  videoUrlInput: "",
  videoRequestError: null,
};

export const songMediaSlice = createSlice({
  name: "songMedia",
  initialState,
  reducers: {
    setAudioUrl: (state, action) => {
      state.audioUrl = action.payload;
    },
    setVideoUrl: (state, action) => {
      state.videoUrl = action.payload;
    },
    setVideoUrlInput: (state, action) => {
      state.videoUrlInput = action.payload;
    },
    setVideoRequestError: (state, action) => {
      state.videoRequestError = action.payload;
    }
  },
});

export const { setAudioUrl, setVideoUrl, setVideoUrlInput, setVideoRequestError } = songMediaSlice.actions;

export default songMediaSlice.reducer;
