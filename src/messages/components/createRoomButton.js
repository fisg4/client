import roomService from '../services/roomService'

import '../../css/messages/components/createRoomButton.css'
import { useNavigate } from 'react-router-dom';

export default function CreateRoomButton ({ song, participantId }) {
  const navigate = useNavigate()
  
  const token = localStorage.getItem('token')

  const handleCreate = async () => {
    try {
      const response = await roomService.createRoom(
        token,
        song.name,
        `Chat para hablar sobre la canción ${song.name}`,
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
    <button className='create-room-button' onClick={() => handleCreate()}>
      <span>💬</span>
    </button>
  )
}