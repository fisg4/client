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
  const [users, setUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState(null);

  const [newMessage, setNewMessage] = useState({});

  async function fetchSong(songId) {
    try {
      const request = new Request("/api/v1/songs/" + songId, {
        method: "GET",
        headers: {},
      });
  
      const response = await fetch(request);
  
      if (!response.ok) {
        throw Error("Response not valid.")
      }
  
      return await response.json();
    } catch (error) {
      return null
    }
  }

  async function fetchUser(userId) {
    try {
      const request = new Request("/api/v1/users/profile/" + userId, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
  
      const response = await fetch(request);

      if (!response.ok) {
        throw Error("Response not valid.")
      }
  
      return await response.json();
    } catch (error) {
      return null
    }
  }

  async function completeParticipantInfo(participant, loggedUser) {
    if (participant.userId === loggedUser.id) {
      const { role, ...info } = user;
      return { ...participant, ...info }
    } else {
      const userResponse = await fetchUser(participant.userId)
      if (userResponse) {
        const { role, ...info } = userResponse;
        return { ...participant, ...info }
      }
      return { ...participant }
    }
  }

  useEffect(() => {
    async function getRoom(loggedUser) {
      try {
        // get room, its messages and its song
        const roomsResponse = await roomService.getRoom(token, id);
        const messagesResponse = await roomService.getRoomMessages(token, id);
        const song = await fetchSong(roomsResponse.content.songId)
        // get info about participants
        const users = [...roomsResponse.content.participants]
        const participantPromises = users.map(async user => {
          return completeParticipantInfo(user, loggedUser)
        });
        const participants = await Promise.all(participantPromises)
        const room = { ...roomsResponse.content, song, participants }
        
        dispatch(setRoom(room));
        setUsers(participants);
        setMessages(messagesResponse.content);
      } catch (error) {
        setErrorMessage("Error al obtener la información del chat");
      }
    }

    if (!token || !user) {
      navigate('/me')
      return
    }

    getRoom(user);
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
      <ActiveChatBody token={token} user={user} users={users} messages={messages}></ActiveChatBody>
      <ActiveChatFooter sendMessage={sendMessage}></ActiveChatFooter>
    </div>
  )
}