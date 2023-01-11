import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/messages/roomList/RoomList.css'
import Room from './Room';

export default function RoomList({ rooms }) {
    return (
    <div className='room-list-container'>
      {
        rooms.map((room) => {
          return (
            <Link className='room-link' to={`${room._id}`} key={room._id}><Room room={room}/></Link>
          )
        })
      }
    </div>
  )
}
