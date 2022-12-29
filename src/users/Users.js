import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default function Users(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Update initial value to an empty object
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if user state variable is empty
    if (user == null) {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        // make POST request to /api/v1/users/profile with token as authorization haeader
        axios.post('/api/v1/users/profile', {}, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then(response => {
          setUser(response.data);
          setIsLoggedIn(true);
        }).catch(error => {
          console.log(error);
        });
      }
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    try {
      const response = await axios.post('/api/auth', {email, password});
      setUser(response.data);
      setIsLoggedIn(true);
      setErrorMessage('');
      //set jwt token to local storage
      localStorage.setItem('token', response.data.accessToken);
      // localStorage.setItem('user', JSON.stringify(response.data));
      console.log(response.data);
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  }

  const handleClick = () => {
    if (isLoggedIn) {
      setIsOpen(true);
    } else {
      // Show login screen
    }
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleSignOff = () => {
    setUser({}); // Clear user data
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  }
  
  return (
    <div>
      {isLoggedIn ? (
        <>
          <Button onClick={handleClick}>Show User Info</Button>
          <Button onClick={handleSignOff}>Sign off</Button>
        </>
      ) : (
        <Card className="mx-auto" style={{ width: '20rem' }}>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input type="text" name="email" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" placeholder="Password" />
              </FormGroup>
              <Button className="text-center" type="submit">Log in</Button>
              {errorMessage && <div>{errorMessage}</div>}
            </Form>
          </CardBody>
        </Card>
      )}
      <Modal isOpen={isOpen} toggle={handleClose}>
        <ModalHeader toggle={handleClose}>User Info</ModalHeader>
        <ModalBody>
          {user && <div>User ID: {user.id}</div>}
          {user && <div>Username: {user.username}</div>}
          {user && <div>Email: {user.email}</div>}
        </ModalBody>
      </Modal>
    </div>
  );
}  
