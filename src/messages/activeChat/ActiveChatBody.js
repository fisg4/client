import React, { useEffect, useRef, useState } from 'react'

import '../../css/messages/activeChat/ActiveChatBody.css'
import Message from './Message'

export default function ActiveChatBody({ messages }) {
  
  const ScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }));
    return <div ref={elementRef} />;
  };

  return (
    <div className='active-chat-body-container'>
      <div className='messages'>
        {
          messages.map((message) => {
            return (
              <Message key={message._id} message={message} />
            )
          })
        }
        <ScrollToBottom />
      </div>
    </div>
  )
}
