import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  spotify: null,
  query: "",
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {},
});

export default songsSlice.reducer;
