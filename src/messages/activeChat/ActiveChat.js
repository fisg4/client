import React, { useState } from 'react'

import '../../css/messages/activeChat/ActiveChat.css'
import ActiveChatHeader from './ActiveChatHeader'
import ActiveChatBody from './ActiveChatBody'
import ActiveChatFooter from './ActiveChatFooter'

export default function ActiveChat() {

  const [activeChat, setActiveChat] = useState(
    {
      id: 1,
      img: 'https://source.unsplash.com/featured/300x201',
      name: 'test'
    },
  );

  /*
  const [activeChat, setActiveChat] = useState(undefined);

  fetch('URI')
    .then(res => res.json)
    .then(data => setActiveChat(data));

  */

  return (
    <div className='active-chat-container'>
      <ActiveChatHeader room={activeChat}></ActiveChatHeader>
      <ActiveChatBody></ActiveChatBody>
      <ActiveChatFooter></ActiveChatFooter>
    </div>
  )
}
