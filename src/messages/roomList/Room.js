import React from 'react'
import { useNavigate } from 'react-router-dom';
import roomService from '../services/roomService'
import { Link } from 'react-router-dom'

import '../../css/messages/roomList/Room.css'

export default function Room({ room }) {
    const navigate = useNavigate();

    // TODO: Extract from localStorage
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MmIyNjQ5YjJlNzA0NjRmMTEzZDQwYyJ9.WlWiI1BFoHJ_B13Yte30ZAMfZvIf5hzMqBfTWBs22m0';
    const user = { id: '562b2649b2e70464f113d40c' }

    const handleDelete = async (roomId) => {
        const response = await roomService.deleteRoom(token, roomId);
        if (response) {
            navigate(0)
        } else {
            alert('No se ha podido eliminar esa sala')
        }
    }

    const userIsAdmin = () => {
        return room.participants.filter(participant => participant.userId === user.id && participant.role === 1).length > 0
    }

    return (
        <div className='room-container'>
            <img className='room-avatar' src={room.img} alt='room-avatar' />
            <Link className='room-link' to={`${room._id}`}>
                <div className='room-name'>
                    <strong>{room.name}</strong>
                </div>
            </Link>
            {userIsAdmin() && (
                <div className='room-actions'>
                    <button onClick={() => handleDelete(room._id)}>Delete</button>
                </div>
            )}
        </div>
    )
}
