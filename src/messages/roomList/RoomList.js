import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import '../../css/messages/roomList/RoomList.css'
import Room from './Room';

export default function RoomList() {

  const [roomList, setRoomList] = useState([
    {
      id: 1,
      img: 'https://source.unsplash.com/featured/300x201',
      name: 'test'
    },
    {
      id: 2,
      img: 'https://source.unsplash.com/featured/300x202',
      name: 'test 2'
    },
    {
      id: 3,
      img: 'https://source.unsplash.com/featured/300x203',
      name: 'test 3'
    },
  ]);

  return (
    <div className='room-list-container'>
      {
        roomList && roomList.map((room) => {
          return (
            <Link className='room-link' to={`${room.id}`} key={room.id}><Room room={room}/></Link>
          )
        })
      }
    </div>
  )
}
