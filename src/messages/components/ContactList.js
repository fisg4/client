import React, { useState } from 'react'
import '../../css/Messages.css'

const users = [
    {
        id: 1,
        name: "Jorge",
        surname: "Test",
    },
    {
        id: 2,
        name: "Félix",
        surname: "Test",
    },
    {
        id: 3,
        name: "Pepe",
        surname: "Test",
    },
    {
        id: 4,
        name: "Domingo",
        surname: "Test",
    },
    {
        id: 5,
        name: "Domingo",
        surname: "Test",
    },
    {
        id: 6,
        name: "Domingo",
        surname: "Test",
    },
    {
        id: 7,
        name: "Domingo",
        surname: "Test",
    },
    {
        id: 8,
        name: "Domingo",
        surname: "Test",
    },
    {
        id: 9,
        name: "Domingo",
        surname: "Test",
    },
    {
        id: 10,
        name: "Domingo",
        surname: "Test",
    },
]

export default function ContactList() {

    const [contacts, setContacts] = useState([]);

    // fetch();

    // axios();

    return (
        <div className='contact-list-container'>
            {
                users.map((user) => {
                    return (
                        <div className='user' key={user.id}>
                            {user.name} {user.surname}
                        </div>
                    )
                })
            }
        </div>
    )
}