import React, { useEffect, useRef } from 'react'

import '../../css/messages/activeChat/ActiveChatBody.css'
import Message from './Message'

export default function ActiveChatBody({ messages }) {

  const ScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }));
    return <div ref={elementRef} />;
  };

  const getMonth = (date) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return months[new Date(date).getMonth()];
  }
  const reversedMessages = [...messages].reverse();

  return (
    <div className='active-chat-body-container'>
      <div className='messages'>
        {
          reversedMessages.map((message, index) => {
            if ((index !== 0) && (new Date(message.createdAt).getDate() === new Date(reversedMessages[index - 1].createdAt).getDate())) {
              return (
                <Message key={message._id} message={message} />
              )
            } else {
              return (
                <React.Fragment key={message._id}>
                  <div className='day'>{new Date(message.createdAt).getDate()}&nbsp;{getMonth(message.createdAt)}&nbsp;{new Date(message.createdAt).getFullYear()}</div>
                  <Message key={message._id} message={message} />
                </React.Fragment>
              )
            }
          })
        }
        <ScrollToBottom />
      </div>
    </div>
  )
}
