import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { BsFillEmojiLaughingFill } from 'react-icons/bs'

import '../../css/Messages.css'

import io from 'socket.io-client';
import { IconContext } from 'react-icons';

export default function ActiveChat() {

    const [message, setMessage] = useState('hello');

    // const [user, setUser] = useState();

    // fetch();

    // axios.get('url')
    // .then((res) => {  })
    // .catch((err) => {  })

    const socket = io.connect('http://localhost:3000');

    const sendMessage = () => {
        socket.emit("send_message", message);
    }

    return (
        <div className='active-chat-container'>
            <div className="header">
                Jorge Test
            </div>
            <div className='messages-list'>

            </div>
            <div className='chat-form'>
                <BsFillEmojiLaughingFill className='btn-emoji' />
                <input type="text" />
                <IoSend onClick={sendMessage} style={{ color: '#38444c' }} className="btn-send" />
            </div>
        </div>
    )
}