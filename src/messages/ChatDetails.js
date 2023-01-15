import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { setRoom } from './slices/roomsSlice'
import roomService from './services/roomService'
import { Table } from 'reactstrap';
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
      dispatch(setRoom(response.content))
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

  return (<>
    <div className="header">
      <h1 className='header-title'>Room information</h1>
      <img src={room?.img} alt='active-chat-header-avatar' className='active-chat-header-avatar' />
      <div className='active-chat-header-name'>
        {!isEditable ? <>
          <span className='d-block'>{room?.name}</span>
          <small>{room?.description}</small>
        </> : <>
          <input className='d-block input-details' onChange={(event) => setName(event.target.value)} value={name} />
          <input className='input-details' onChange={(event) => setDescription(event.target.value)} value={description} />
        </>}
      </div>
    </div>
    <Table responsive
      className='w-50 table'  
    >
      <thead className='table-header'>
        <tr>
          <th>
            Participants
          </th>
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {room.participants?.map((participant, index) => {
          console.log(index)
          return (
            <tr key={index} className="table-row">
              <td>{participant.userId}</td>
              <td className='actions-container'>
                {!isEditable ? <>
                  <button className='btn-sm btn-edit' onClick={() => setEditable(true)}>Editar</button>
                  <button className='btn-sm btn-delete' onClick={() => handleDelete(room?._id)}>Delete</button>
                </> : <>
                  <button className='btn-sm btn-edit' onClick={() => handleSubmit()}>Confirmar</button>
                  <button className='btn-sm btn-delete' onClick={() => setEditable(false)}>Cancelar</button>
                </>}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    {/* <div className="participants-container">
      {room && room?.participants.map(participant =>
        <div className="participant-row" key={participant.userId}>
          <span>{participant.userId}</span>
          {participant.role === 1 && <span>⭐</span>}
        </div>
      )}
    </div>
    <div className="actions-container">
      {userIsAdmin() && (
        <div className='room-actions'>
          {!isEditable ? <>
            <button className='btn btn-sm btn-primary' onClick={() => setEditable(true)}>Editar</button>
            <button className='btn btn-sm btn-danger' onClick={() => handleDelete(room?._id)}>Delete</button>
          </> : <>
            <button className='btn btn-sm btn-success' onClick={() => handleSubmit()}>Confirmar</button>
            <button className='btn btn-sm btn-danger' onClick={() => setEditable(false)}>Cancelar</button>
          </>}
        </div>
      )}
    </div> */}
  </>)
}