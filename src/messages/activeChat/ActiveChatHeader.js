import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import '../../css/messages/activeChat/ActiveChatHeader.css'

export default function ActiveChatHeader() {
  const { room } = useSelector(state => state.rooms);

  return (
    <div className='active-chat-header-container'>
      <img src={room?.img} alt='active-chat-header-avatar' className='active-chat-header-avatar'/>
      <div className='active-chat-header-name'>
        <span className='d-block'>{room?.name}</span>
      </div>
      <Link className='btn btn-sm btn-secondary' to={'details'}>Detalles</Link>
    </div>
  )
}
