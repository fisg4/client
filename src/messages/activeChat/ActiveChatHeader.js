import React from 'react'
import { useLocation  } from 'react-router-dom';

import '../../css/messages/activeChat/ActiveChatHeader.css'

export default function ActiveChatHeader() {

  const { state } = useLocation();
  const { currentRoom } = state || {};

  return (
    <div className='active-chat-header-container'>
      <img src={currentRoom.img} alt='active-chat-header-avatar' className='active-chat-header-avatar' />
      <div className='active-chat-header-name'>
        <span className='d-block'>{currentRoom.name}</span>
        <small>{currentRoom.description}</small>
      </div>
    </div>
  )
}
