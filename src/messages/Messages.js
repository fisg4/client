import React from 'react'
import ContactList from './components/ContactList';
import ActiveChat from './components/ActiveChat';
import '../css/Messages.css'

export default function Messages() {
    return (
        <div className="Chat">
            <ContactList />
            <ActiveChat />
        </div>
    );
}