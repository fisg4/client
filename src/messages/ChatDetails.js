import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { setRoom } from './slices/roomsSlice'
import roomService from './services/roomService'
import { MdOutlineEdit } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import '../css/messages/activeChat/Details.css'

export default function ChatDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { room } = useSelector(state => state.rooms);

  const [isEditable, setEditable] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const redirectToChat = () => navigate(`/chats/${id}`)
    const setValues = () => {
      setName(room.name)
      setDescription(room.description)
    }

    if (!token || !user) {
      navigate('/me')
      return
    }

    if (!room) {
      redirectToChat()
    } else {
      setValues()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleDelete = async (roomId) => {
    const response = await roomService.deleteRoom(token, roomId);
    if (response) {
      navigate('/chats')
    } else {
      alert('No se ha podido eliminar esa sala')
    }
  }

  const handleSubmit = async (event) => {
    const response = await roomService.modifyRoom(token, room._id, name, description);
    if (response.success) {
      const { name, description } = response.content;
      dispatch(setRoom({ ...room, name, description }))
      setEditable(false)
    } else {
      setEditable(false)
      setName(room.name)
      setDescription(room.description)
      alert('No se ha podido modificar esta sala')
    }
  }

  const userIsAdmin = () => {
    return room.participants.filter(participant => participant.userId === user.id && participant.role === 1).length > 0
  }

  if (!room) {
    return navigate(`/chats/${id}`);
  }

  return (
    <>

      <div className='chat-details-container'>
        <div className='chat-details-header'>
          <div className='edit-container'>
            <div className='chat-details-header-main-content'>
              <img src={room?.song?.albumCover} alt='active-chat-header-avatar' className='active-chat-header-avatar' />
              <div className='d-flex flex-column active-chat-header-name'>
                {!isEditable ? <>
                  <span>{room?.name}</span>
                  <small>{room?.description}</small>
                </> : <>
                  <input className='input-details' onChange={(event) => setName(event.target.value)} value={name} />
                  <input className='input-details' onChange={(event) => setDescription(event.target.value)} value={description} />
                </>}
              </div>
            </div>
            <div className='actions-container'>
              
            </div>
          </div>
        </div>
      </div>


      <div className='d-flex flex-column active-chat-container'>
        <div className="active-chat-header-container">
          <img src={room?.song?.albumCover} alt='active-chat-header-avatar' className='active-chat-header-avatar' />
          <div className='d-flex flex-column active-chat-header-name'>
            {!isEditable ? <>
              <span>{room?.name}</span>
              <small>{room?.description}</small>
            </> : <>
              <input className='input-details' onChange={(event) => setName(event.target.value)} value={name} />
              <input className='input-details' onChange={(event) => setDescription(event.target.value)} value={description} />
            </>}
          </div>
        </div>
        <div className="row mt-1 participants-container">
          <div className="col-12">
            {room && room?.participants.map(participant =>
              <div className="row py-2" key={participant.userId}>
                <span className='col-12 text-center'>{participant?.username} ({participant?.email}) {participant.role === 1 && <span>⭐</span>}</span>
              </div>
            )}
          </div>
        </div>
        <div className='row flex-column mt-1 p-2 song-info'>
          <span><strong>{room?.song?.title}</strong> - {room?.song?.releaseDate}</span>
          <small>{room?.song?.artists.join(", ")}</small>
          <small><i className='bi bi-heart-fill'></i> {room?.song?.likes.length} likes</small>
        </div>
        {userIsAdmin() && (
          <div className="row mt-1 justify-content-around actions-container">
            <div className='text-center'>
              {!isEditable ?
                <button className='btn btn-msg' onClick={() => setEditable(true)}>
                  Edit <i className="bi bi-pencil-square"></i>
                </button> :
                <button className='btn btn-msg' onClick={() => handleSubmit()}>
                  Confirm <i className="bi bi-check-circle-fill"></i>
                </button>
              }
            </div>
            <div className='text-center'>
              {!isEditable ?
                <button className='btn btn-msg' onClick={() => handleDelete(room?._id)}>
                  Delete <i className="bi bi-trash-fill"></i>
                </button> :
                <button className='btn btn-msg' onClick={() => setEditable(false)}>
                  Cancel <i className="bi bi-x-circle-fill"></i>
                </button>
              }
            </div>
          </div>
        )}
      </div>
    </>
  )
}