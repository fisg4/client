import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likeList: [],
  count: 0,
};

export const likesSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikeList: (state, action) => {
      state.likeList = action.payload;
    },
    setCount: (state, action) => {
      state.count = action.payload;
    },
  },
});

export const { setLikeList, setCount } = likesSlice.actions;

export default likesSlice.reducer;
