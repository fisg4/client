import React, { useEffect, useRef, useState } from 'react'

import '../../css/messages/activeChat/ActiveChatBody.css'
import Message from './Message'

export default function ActiveChatBody() {

  const [messages, setMessages] = useState([
    {
      id: 0,
      participant: 'N',
      time: '14:25:06',
      text: 'hey'
    },
    {
      id: 1,
      participant: 'N',
      time: '14:25:10',
      text: 'Sup'
    },
    {
      id: 2,
      participant: 'Casdasdadsasd',
      time: '14:30:21',
      text: 'Hello!'
    },
    {
      id: 3,
      participant: 'C',
      time: '14:30:21',
      text: 'How is the day going!'
    },
    {
      id: 4,
      participant: 'C',
      time: '14:30:21',
      text: 'Not much. Wbu?'
    },
    {
      id: 5,
      participant: 'C',
      time: '14:30:21',
      text: 'Good?'
    },
    {
      id: 6,
      participant: 'C',
      time: '14:30:21',
      text: 'Hello!'
    },
    {
      id: 7,
      participant: 'N',
      time: '14:25:06',
      text: 'hey'
    },
    {
      id: 8,
      participant: 'N',
      time: '14:25:06',
      text: 'hey'
    },
    {
      id: 9,
      participant: 'N',
      time: '14:25:06',
      text: 'hey'
    },
  ]);

  /*

  const [messages, setMessages] = useState(undefined);

  useEffect(()=>{
    fetch('URI')
      then(res => res.json())
      .then(data => setMessages(data));
  }, [])

  */

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
              <Message key={message.id} message={message} />
            )
          })
        }
        <ScrollToBottom />
      </div>
    </div>
  )
}
