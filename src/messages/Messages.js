import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/messages/Messages.css'
import Paginator from './roomList/Paginator';
import RoomList from './roomList/RoomList'
import { setRooms, setPagination } from './slices/roomsSlice'

import { getRooms } from './services/roomService';

export default function Messages() {
  const dispatch = useDispatch();

  const { rooms, pagination } = useSelector(state => state.rooms);
  const { currentPage, totalElements, totalPages } = pagination;

  // TODO: Extract from localStorage
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MmIyNjQ5YjJlNzA0NjRmMTEzZDQwYyJ9.WlWiI1BFoHJ_B13Yte30ZAMfZvIf5hzMqBfTWBs22m0';

  useEffect(() => {
    async function getRoomList() {
        const roomsResponse = await getRooms(token, currentPage, 5);
        if (roomsResponse.success) {
          const { content, totalElements, totalPages } = roomsResponse;
          const currentPage = parseInt(roomsResponse.currentPage);
          dispatch(setRooms(content))
          dispatch(setPagination({ currentPage, totalElements, totalPages }))
        }
    }

    getRoomList();
  }, [currentPage]);

  const handleChangePage = (newPage) => {
    dispatch(setPagination({ ...pagination, currentPage: newPage }))
  }

    return (
        <div className='messages-container'>
            <Paginator
              currentPage={currentPage}
              totalElements={totalElements}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
            />
            <RoomList rooms={rooms}/>
        </div>
    );
}