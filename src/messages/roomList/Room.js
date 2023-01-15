import React from 'react'

import '../../css/messages/roomList/Room.css'

export default function Room({ room }) {

    // TODO: Extract from localStorage and check if user has access to this
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2MmIyNjQ5YjJlNzA0NjRmMTEzZDQwYyJ9.WlWiI1BFoHJ_B13Yte30ZAMfZvIf5hzMqBfTWBs22m0';
    // const user = { id: '562b2649b2e70464f113d40c' }

    return (
        <div className='room-container'>
            {/* <img className='room-avatar' src={room.img} alt='room-avatar' /> */}
            <div className='room-name'>
                <strong>{room.name}</strong>
            </div>
        </div>
    )
}
