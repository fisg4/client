import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

export default function Users(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Update initial value to an empty object
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check if user state variable is empty
    if (user == null) {
      const accessToken = localStorage.getItem('token');
      if (accessToken){
        setProfile();
      }
    }
  }, [user]);

  const setProfile = async () => {
    if (user == null) {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        const response = await fetch('/api/v1/users/profile', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const user = await response.json();
        // store in local storage
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setIsLoggedIn(true);
      }
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
      });
      // if the response is not ok setErrorMessage
      if (!response.ok) {
        setErrorMessage('Invalid email or password');
      }else{
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        setProfile();
        setIsLoggedIn(true);
        setErrorMessage('');
        // reload page
        window.location.reload();
        console.log(response.data);
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleSignOff = () => {
    setUser(null); // Clear user data
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // reload page
    window.location.reload();
  }
  
  return (
    <div>
      {isLoggedIn ? (
        <>
        <div class="text-center">
          <Card className="mx-auto" style={{ width: '20rem' }}>
            <CardBody>
              <CardTitle>Usuario: {user.username}</CardTitle>
              <CardSubtitle>Email: {user.email}</CardSubtitle>
            </CardBody>
          </Card>
          <div class="mt-2">
            <Button onClick={handleSignOff}>Sign off</Button>
          </div>
        </div>
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
              {errorMessage && <div class="text-center mt-3 text-danger">{errorMessage}</div>}
            </Form>
          </CardBody>
          <div class="text-center mb-3">(Don't have an account yet? <a href="/register">Click here</a>)</div>
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
