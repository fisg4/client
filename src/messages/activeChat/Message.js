import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import messageService from '../services/messageService';

import '../../css/messages/activeChat/Message.css'

import {
  Button, Modal, ModalBody
} from "reactstrap"

export default function Message({ token, user, users, message }) {

  const [text, setText] = useState(message.text);
  const [reason, setReason] = useState('');
  const author = users.find(user => user.id === message.userId);

  /* Toggling */
  const [toggleActions, setToggleActions] = useState(false);
  const [toggleEditable, setToggleEditable] = useState(false);
  const [translatedText, setTranslatedText] = useState(message.translatedText);

  /* Modal */
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  /* Refs */
  const menuRef = useRef();

  /* Messages */
  const [reportMessage, setReportMessage] = useState('');

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
      alert('The message could not be translated');
    }

  }

  const modifyMessage = async () => {
    try {
      const response = await messageService.modifyMessage(token, message._id, text);
      setText(response.content.text);
      setTranslatedText('');
      setToggleEditable(false);
    } catch (err) {
      setText(message.text);
      alert('The edition could not be done');
    }
  }

  const sendReport = async () => {
    try {
      await messageService.reportMessage(token, message._id, reason);
      setReportMessage(<div className='alert alert-success'>Report sent successfully</div>);
    } catch (err) {
      setReportMessage(<div className='alert alert-danger'>Error while reporting message</div>);
    }
  }

  return (
    <React.Fragment>
      <div className={`message-container ${message.userId === user?.id ? 'mine' : ''}`}>
        <div ref={menuRef}>
          {toggleActions &&
            <div className={`message-actions ${message.userId === user?.id ? 'my-actions' : 'other-actions'}`}>
              {
                message.userId !== user?.id &&
                <>
                  <div className='message-action' onClick={toggle}>Report this message</div>
                  <hr></hr>
                  <div className='message-action' onClick={() => translateMessage(message)}>Translate this message</div>
                </>
              }
              {
                message.userId === user?.id &&
                <>
                  <div className='message-action' onClick={() =>
                    setToggleEditable(true)
                  }>Edit this message</div>
                </>
              }
            </div>
          }
        </div>

        <BsThreeDotsVertical className={`toggle-message-actions ${message.userId === user?.id ? 'toggle-message-actions-mine' : ''}`} onClick={() => setToggleActions(!toggleActions)} />
        <div className='message-participant'>
          {author?.username || message.userId}
        </div>
        {message?.reportedBy?.isBanned ?
          <i>This message has been banned</i>
        :
          <div className='message-text'>
            {!toggleEditable ?
              text :
              <div className='edit-container'>
                <input className='input-edit-message' value={text} onChange={(event) => setText(event.target.value)} />
                <button onClick={() => modifyMessage()}>Editar</button>
              </div>
            }
            {translatedText && <><br></br> <i><span>Translated text: {translatedText}</span></i></>}
          </div>
        }
        <div className='message-time'>
            {new Date(message.createdAt).getHours()}:{new Date(message.createdAt).getMinutes()}
          </div>
      </div>
      <Modal isOpen={modal}
        toggle={toggle}
        modalTransition={{ timeout: 0 }}>
        <ModalBody className='modal-body'>
          <div className='modal-title'>Include a reason:</div>
          <div className='alert-report'>{reportMessage}</div>
          <div className='modal-form'>
            <textarea value={reason} onChange={(event) => setReason(event.target.value)} />
            <Button onClick={sendReport}>Send report</Button>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment >
  )
}