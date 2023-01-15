import React from 'react'

import '../../css/messages/roomList/Room.css'

export default function Room({ room }) {
    return (
        <div className='room-container'>
            <div className='room-name'>
                <strong>{room.name}</strong>
            </div>
        </div>
    )
}
