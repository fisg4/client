import roomService from '../services/roomService'

import '../../css/messages/components/createChatButton.css'
import { useNavigate } from 'react-router-dom';

export default function CreateChatButton({ song, participantId }) {
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  const handleCreate = async () => {
    try {
      const response = await roomService.createRoom(
        token,
        song.title,
        `Chat para hablar sobre la canción ${song.title}`,
        song.id,
        [participantId]
      )

      if (!response.success) {
        throw new Error(response.message)
      }

      const { _id } = response.content
      navigate(`/chats/${_id}`)
    } catch (error) {
      alert(`No se ha podido crear un chat para '${song.title}'`)
    }
  }

  return (
    <>
    <button className='btn border-blue text-blue bg-light d-none d-sm-block' onClick={() => handleCreate()}>
      <span className='h5 fw-normal'>Message <i className="bi bi-chat-dots-fill ms-2 "></i>
      </span>
    </button>
    <a href='#message' className='darkBlueText d-block d-sm-none' onClick={() => handleCreate()}>
      <i className="bi bi-chat-dots-fill h1"></i>
    </a>
    </>
  )
}