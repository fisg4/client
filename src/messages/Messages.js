import React from 'react'

import '../css/messages/Messages.css'
import RoomList from './roomList/RoomList'

export default function Messages() {
    return (
        <div className='messages-container'>
            <RoomList />
        </div>
    );
}