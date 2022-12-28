import React, { useEffect, useRef, useState } from 'react'

import '../../css/messages/activeChat/Message.css'

export default function Message({ message }) {

  const [currentUser, setCurrentUser] = useState(true);

  return (
    <div className={`message-container ${message.participant == 'C' ? 'mine' : ''}`}>
      <div className='message-participant'>
        {message._id}
      </div>
      <div className='message-text'>
        {message.text}
      </div>
      <div className='message-time'>
        {message.createdAt}
      </div>
    </div>
  )
}
