import React from 'react'
import { useLocation, useNavigate } from 'react-router';
//Files
import '../../css/messages/activeChat/ActiveChat.css'
import ActiveChatHeader from './ActiveChatHeader'
import ActiveChatBody from './ActiveChatBody'
import ActiveChatFooter from './ActiveChatFooter'

export default function ActiveChat() {

  const navigate = useNavigate();

  const { state } = useLocation();
  const { currentRoom, messages } = state || {};

  const sendParticipants = async () => {
    let participants = currentRoom.participants;
    navigate("participants", { state: { participants: participants } });
  }

  return (
    <div className='active-chat-container'>
      <div onClick={sendParticipants} className='active-chat-header-outer-container'>
        <ActiveChatHeader></ActiveChatHeader>
      </div>
      <ActiveChatBody messages={messages}></ActiveChatBody>
      <ActiveChatFooter></ActiveChatFooter>
    </div>
  )
}
