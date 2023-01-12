import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rooms: [],
    pagination: {
        currentPage: 0,
        totalElements: 0,
        totalPages: 0
    },
    room: null
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
        },
        setRoom: (state, action) => {
            state.room = action.payload;
        }
    }
});

export const { setRooms, setPagination, setRoom } = roomsSlice.actions;

export default roomsSlice.reducer;