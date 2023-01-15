import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../css/messages/Messages.css'
import Paginator from './roomList/Paginator';
import RoomList from './roomList/RoomList'
import { setRooms, setPagination } from './slices/roomsSlice'
import roomService from './services/roomService';
import { useNavigate } from 'react-router-dom';
import Alert from '../common/components/Alert';

export default function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rooms, pagination } = useSelector(state => state.rooms);
  const { currentPage, totalElements, totalPages } = pagination;
  const [errorMessage, setErrorMessage] = useState(null);

  const token = localStorage.getItem('token')

  useEffect(() => {
    async function getRoomList() {
      try {
        const response = await roomService.getRooms(token, currentPage, 1);
        if (response.success) {
          const { content, totalElements, totalPages } = response;
          const currentPage = parseInt(response.currentPage);
          dispatch(setRooms(content))
          dispatch(setPagination({ currentPage, totalElements, totalPages }))
        }
      } catch (error) {
        setErrorMessage("Ha ocurrido un problema al recuperar los chats");
      }
    }

    if (!token) {
      navigate('/me')
      return
    }

    getRoomList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleChangePage = (newPage) => {
    dispatch(setPagination({ ...pagination, currentPage: newPage }))
  }

  if (rooms.length <= 0) {
    return <span className='text-center'>No chats have been found</span>
  }

  if (errorMessage != null) {
    return (<Alert message={errorMessage}/>);
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