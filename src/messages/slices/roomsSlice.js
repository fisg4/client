import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
    pagination: {
        currentPage: 0,
        totalElements: 0,
        totalPages: 0
    },
  };

export const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        setRooms: (state, action) => {
            state.rooms = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = action.payload;
        }
    }
});

export const { setRooms, setPagination } = roomsSlice.actions;

export default roomsSlice.reducer;