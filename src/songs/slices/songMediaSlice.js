import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  audioUrl: "",
  videoUrl: "",
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
  },
});

export const { setAudioUrl, setVideoUrl } = songMediaSlice.actions;

export default songMediaSlice.reducer;
