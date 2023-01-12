import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import messageService from '../services/messageService';

import '../../css/messages/activeChat/Message.css'

export default function Message({ message }) {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MmIyNjQ5YjJlNzA0NjRmMTEzZDQwYyJ9.WlWiI1BFoHJ_B13Yte30ZAMfZvIf5hzMqBfTWBs22m0';
  
  const [currentUser, setCurrentUser] = useState('562b2649b2e70464f113d40c');
  const [text, setText] = useState(message.text);
  const [toggleActions, setToggleActions] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!menuRef?.current?.contains(event.target)) {
        setToggleActions(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  const translateMessage = (message) => {
    const translated = messageService.translateMessage(token, message._id);
    console.log(translated)
    // setText(translated);
  }

  return (
    <React.Fragment>
      <div className={`message-container ${message.userId === currentUser ? 'mine' : ''}`}>

      <div ref={menuRef}>
        {toggleActions &&
          <div className={`message-actions ${message.userId === currentUser ? 'my-actions' : ''}`}>
            <div className='message-action'>Report this message</div>
            <hr></hr>
            <div className='message-action' onClick={()=>translateMessage(message)}>Translate this message</div>
          </div>
        }
      </div>

      <BsThreeDotsVertical className={`toggle-message-actions ${message.userId === currentUser ? 'toggle-message-actions-mine' : ''}`} onClick={() => setToggleActions(!toggleActions)} />
      <div className='message-participant'>
        {message.userId}
      </div>
      <div className='message-text'>
        {text}
      </div>
      <div className='message-time'>
        {new Date(message.createdAt).getHours()}:{new Date(message.createdAt).getMinutes()}
      </div>
    </div>
    </React.Fragment >
  )
}
