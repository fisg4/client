import React from 'react'
import '../../css/messages/roomList/RoomList.css'
import Room from './Room';

export default function RoomList({ rooms }) {
    return (
    <div className='room-list-container'>
      {
        rooms.map((room) => {
          return (
            <Room key={room._id} room={room}/>
          )
        })
      }
    </div>
  )
}
