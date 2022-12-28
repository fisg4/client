import React from 'react'

import '../../css/messages/activeChat/ActiveChatHeader.css'

export default function ActiveChatHeader({room}) {
  return (
    <div className='active-chat-header-container'>
      <img src={room.img} alt='active-chat-header-avatar' className='active-chat-header-avatar'/>
      <div className='active-chat-header-name'>
        <span className='d-block'>{room.name}</span>
        <small>{room.description}</small>
      </div>
    </div>
  )
}
