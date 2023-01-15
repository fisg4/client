import React, { useState } from 'react'
import '../../css/messages/activeChat/ActiveChatFooter.css'

export default function ActiveChatFooter({ sendMessage }) {

  const [newMessage, setNewMessage] = useState('');

  function onSubmit() {
    sendMessage(newMessage);
    setNewMessage('');
  }

  return (
    <div className='active-chat-footer-container'>
      <input className='form-control' type='text' value={newMessage} onChange={((event) => setNewMessage(event.target.value))} />
      <button className='btn btn-send-message' onClick={() => onSubmit()}>Send</button>
    </div>
  )
}
