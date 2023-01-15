import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { setRoom } from './slices/roomsSlice'
import '../css/messages/activeChat/ActiveChat.css'
import ActiveChatHeader from './activeChat/ActiveChatHeader'
import ActiveChatBody from './activeChat/ActiveChatBody'
import ActiveChatFooter from './activeChat/ActiveChatFooter'
import roomService from './services/roomService';
import Alert from '../common/components/Alert';

export default function ActiveChat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { room } = useSelector(state => state.rooms);

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  const [messages, setMessages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const [newMessage, setNewMessage] = useState({});

  useEffect(() => {
    async function getRoom() {
      try {
        const roomsResponse = await roomService.getRoom(token, id);
        const messagesResponse = await roomService.getRoomMessages(token, id);
        dispatch(setRoom(roomsResponse.content));
        setMessages(messagesResponse.content);
      } catch (error) {
        setErrorMessage("Error al obtener la información del chat");
      }
    }

    if (!token || !user) {
      navigate('/me')
      return
    }

    getRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, newMessage]);

  async function sendMessage(message) {
    if (message) {
      try {
        const newMessageResponse = await roomService.createRoomMessage(token, room._id, message);
        setNewMessage(newMessageResponse.content);
      } catch (err) {
        alert('Could not send the message');
      }
    }
  }

  if (errorMessage != null) {
    return (<Alert message={errorMessage} />);
  }

  return (
    <div className='active-chat-container'>
      <ActiveChatHeader room={room}></ActiveChatHeader>
      <ActiveChatBody token={token} user={user} messages={messages}></ActiveChatBody>
      <ActiveChatFooter sendMessage={sendMessage}></ActiveChatFooter>
    </div>
  )
}