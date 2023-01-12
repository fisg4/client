import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../css/messages/roomList/RoomList.css'
import Room from './Room';
import roomService from '../services/roomService';

export default function RoomList({ rooms }) {
  const navigate = useNavigate();

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MmIyNjQ5YjJlNzA0NjRmMTEzZDQwYyJ9.WlWiI1BFoHJ_B13Yte30ZAMfZvIf5hzMqBfTWBs22m0';

  async function sendRoom(roomId) {

    let room = rooms.filter((currentRoom) => {
      return currentRoom._id === roomId
    });

    const messagesResponse = await roomService.getRoomMessages(token, room[0]?._id);

    navigate(`${roomId}`,
      {
        state: {
          currentRoom: room[0],
          messages: messagesResponse.content
        }
      });
  }

  return (
    <div className='room-list-container'>
      {
        rooms.map((room) => {
          return (
            <div className='room-link' onClick={() => sendRoom(room._id)} key={room._id}><Room room={room} /></div>
          )
        })
      }
    </div>
  )
}
