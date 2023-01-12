import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { setRoom } from '../slices/roomsSlice'
import '../../css/messages/activeChat/ActiveChat.css'
import ActiveChatHeader from './ActiveChatHeader'
import ActiveChatBody from './ActiveChatBody'
import ActiveChatFooter from './ActiveChatFooter'
import roomService from '../services/roomService';
import Alert from '../../common/components/Alert';

export default function ActiveChat() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { room } = useSelector(state => state.rooms);
  // TODO: Extract from localStorage
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MmIyNjQ5YjJlNzA0NjRmMTEzZDQwYyJ9.WlWiI1BFoHJ_B13Yte30ZAMfZvIf5hzMqBfTWBs22m0';
  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function getRoomDetails() {
      try {
        const roomsResponse = await roomService.getRoom(token, id);
        const messagesResponse = await roomService.getRoomMessages(token, id);
        dispatch(setRoom(roomsResponse.content));
        setMessages(messagesResponse.content);
      } catch (error) {
        setErrorMessage("Error al obtener la información del chat");
      }
    }

    getRoomDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (errorMessage != null) {
    return (<Alert message={errorMessage}/>);
  }

  return (
    <div className='active-chat-container'>
      <ActiveChatHeader room={room}></ActiveChatHeader>
      <ActiveChatBody messages={messages}></ActiveChatBody>
      <ActiveChatFooter></ActiveChatFooter>
    </div>
  )
}
