import roomService from '../services/roomService'

import '../../css/messages/components/createChatButton.css'
import { useNavigate } from 'react-router-dom';

export default function CreateChatButton ({ song, participantId }) {
  const navigate = useNavigate()
  
  const token = localStorage.getItem('token')

  const handleCreate = async () => {
    try {
      const response = await roomService.createRoom(
        token,
        song.name,
        `Chatting about ${song.name}`,
        song.id,
        [participantId]
      )

      if (!response.success) {
        throw new Error(response.message)
      }

      const { _id } = response.content
      navigate(`/chats/${_id}`)
    } catch (error) {
      alert(`No se ha podido crear un chat para '${song.name}'`)
    }
  }

  return (
    <button className='create-chat-button' onClick={() => handleCreate()}>
      <span>💬</span>
    </button>
  )
}