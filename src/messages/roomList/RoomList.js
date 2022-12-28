import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import '../../css/messages/roomList/RoomList.css'
import roomService from '../services/roomService';
import Room from './Room';
import Alert from '../../common/components/Alert';

export default function RoomList() {
  // TODO: Extract from localStorage
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MmIyNjQ5YjJlNzA0NjRmMTEzZDQwYyJ9.WlWiI1BFoHJ_B13Yte30ZAMfZvIf5hzMqBfTWBs22m0';
  const [roomList, setRoomList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function getRoomList() {
      try {
        const roomsResponse = await roomService.getRooms(token);
        setRoomList(roomsResponse.content);
      } catch (error) {
        setErrorMessage("Error al obtener los chats del usuario");
      }
    }

    getRoomList();
  }, [roomList]);

  return (
    <div className='room-list-container'>
      <Alert message={errorMessage} onClose={() => setErrorMessage(null)}/>
      {
        roomList && roomList.map((room) => {
          return (
            <Link className='room-link' to={`${room._id}`} key={room._id}><Room room={room}/></Link>
          )
        })
      }
    </div>
  )
}
