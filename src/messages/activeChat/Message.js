import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import messageService from '../services/messageService';

import '../../css/messages/activeChat/Message.css'

import {
  Button, Modal, ModalBody
} from "reactstrap"

export default function Message({token, user, message }) {

  const [text, setText] = useState(message.text);
  const [reason, setReason] = useState('');

  /* Toggling */
  const [toggleActions, setToggleActions] = useState(false);
  const [toggleEditable, setToggleEditable] = useState(false);
  const [translatedText, setTranslatedText] = useState(message.translatedText);

  /* Modal */
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  /* Refs */
  const menuRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      if (!menuRef?.current?.contains(event.target)) {
        setToggleActions(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  const translateMessage = async (message) => {
    try {
      const response = await messageService.translateMessage(token, message._id);
      setTranslatedText(response.content.translatedText);
    } catch (err) {
      alert('No se pudo realizar la traducción');
    }

  }

  const modifyMessage = async () => {
    try {
      const response = await messageService.modifyMessage(token, message._id, text);
      setText(response.content.text);
      setToggleEditable(false);
    } catch (err) {
      setText(message.text);
      alert('No se pudo realizar la edición :(');
    }
  }

  return (
    <React.Fragment>
      <div className={`message-container ${message.userId === user?.id ? 'mine' : ''}`}>
        <div ref={menuRef}>
          {toggleActions &&
            <div className={`message-actions ${message.userId === user?.id ? 'my-actions' : ''}`}>
              <div className='message-action' onClick={toggle}>Report this message</div>
              <hr></hr>
              <div className='message-action' onClick={() => translateMessage(message)}>Translate this message</div>
              <hr></hr>
              <div className='message-action' onClick={() =>
                setToggleEditable(true)
              }>Edit this message</div>
            </div>
          }
        </div>

        <BsThreeDotsVertical className={`toggle-message-actions ${message.userId === user?.id ? 'toggle-message-actions-mine' : ''}`} onClick={() => setToggleActions(!toggleActions)} />
        <div className='message-participant'>
          {message.userId}
        </div>
        <div className='message-text'>
          {!toggleEditable ?
            text :
            <>
              <input value={text} onChange={(event) => setText(event.target.value)} />
              <button onClick={() => modifyMessage()}>Editar</button>
            </>
          }
          {translatedText}
        </div>
        <div className='message-time'>
          {new Date(message.createdAt).getHours()}:{new Date(message.createdAt).getMinutes()}
        </div>
      </div>
      <Modal isOpen={modal}
        toggle={toggle}
        modalTransition={{ timeout: 0 }}>
        <ModalBody>
          Include a reason:
          <input value={reason} onChange={(event) => setReason(event.target.value)} />
          <Button>Send report</Button>
        </ModalBody>
      </Modal>
    </React.Fragment >
  )
}