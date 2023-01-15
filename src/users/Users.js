import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import LikedSongs from './LikedSongs';
import DeleteButton from './components/DeleteButton';
import '../css/users/LikeButton.css'

export default function Users(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Update initial value to an empty object
  const [errorMessage, setErrorMessage] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      }
    } catch (error) {
      setErrorMessage('Invalid email or password');
    }
  }

  const showForm = () => {
    setShowUpdateForm(!showUpdateForm);
  }

  const handleSignOff = () => {
    setUser(null); // Clear user data
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // reload page
    window.location.reload();
  }
  
  const handleUpdate = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    const accessToken = localStorage.getItem('token');
    if (accessToken) {
      const response = await fetch('/api/v1/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({email, username, password})
      })
      console.log(response.ok);
      if (!response.ok) {
        if (response.status === 401) {
          setErrorMessage('Bad words are not allowed');
          return;
        } else if (response.status === 400) {
          setErrorMessage('Email or username already exists');
        }
      } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setErrorMessage('');
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            window.location.reload();
        };
    }
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
            <Button onClick={showForm}>Update data</Button> &nbsp; &nbsp; &nbsp;
            <Button onClick={handleSignOff}>Sign off</Button>
          </div>
          {showUpdateForm ? (
            <div class="mt-2">




              <Card className='d-flex justify-content-center w-50 mx-auto'>
                <CardBody>
                  <CardTitle className='display-4 text-center'>Edit your info</CardTitle>
        {errorMessage && <p class='text-center text-danger'>{errorMessage}</p>}
        <Form onSubmit={handleUpdate}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your new email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              required
              type="text"
              name="username"
              id="username"
              placeholder="Enter your new username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your new password (optional)"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm your new password (optional)"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Edit
          </Button>
        </Form>
      </CardBody>
    </Card>
            </div>
          ) : null}
        </div>
        <br>
        </br>
        <div class="row mb-1 w-75 mx-auto text-center">
          <h5><i className="bi bi-heart-fill heart-filled" /> Liked songs <i className="bi bi-heart-fill heart-filled" /></h5>
        </div>
        <LikedSongs />
        <div class="mt-2" style={{ display: 'flex', justifyContent: 'center' }}>
        <DeleteButton></DeleteButton>
            
          </div>
        

        </>
        
      ) : (
        <Card className="mx-auto" style={{ width: '20rem' }}>
          <CardBody>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input required type="text" name="email" placeholder="Email" />
              </FormGroup>
              <FormGroup>
                <Input required type="password" name="password" placeholder="Password" />
              </FormGroup>
              <Button className="text-center" type="submit">Log in</Button>
              {errorMessage && <div class="text-center mt-3 text-danger">{errorMessage}</div>}
            </Form>
          </CardBody>
          <div class="text-center mb-3">(Don't have an account yet? <a href="/register">Click here</a>)</div>
        </Card>
      )}
    </div>
  );
}  
