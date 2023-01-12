import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/messages/Messages.css'
import Paginator from './roomList/Paginator';
import RoomList from './roomList/RoomList'
import { setRooms, setPagination } from './slices/roomsSlice'

import roomService from './services/roomService';

export default function Messages() {
  const dispatch = useDispatch();

  const { rooms, pagination } = useSelector(state => state.rooms);
  const { currentPage, totalElements, totalPages } = pagination;

  // TODO: Extract from localStorage
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MmIyNjQ5YjJlNzA0NjRmMTEzZDQwYyJ9.WlWiI1BFoHJ_B13Yte30ZAMfZvIf5hzMqBfTWBs22m0';

  useEffect(() => {
    async function getRoomList() {
      const response = await roomService.getRooms(token, currentPage, 3);
      if (response.success) {
        const { content, totalElements, totalPages } = response;
        const currentPage = parseInt(response.currentPage);
        dispatch(setRooms(content))
        dispatch(setPagination({ currentPage, totalElements, totalPages }))
      }
    }

    getRoomList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleChangePage = (newPage) => {
    dispatch(setPagination({ ...pagination, currentPage: newPage }))
  }

  if (rooms.length <= 0) {
    return <h4 className='text-center'>No se han encontrado salas</h4>
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