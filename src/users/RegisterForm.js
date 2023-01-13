import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
      });
      if (response.ok) {
        console.log(response);
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        navigation('/me');
      } else {
        if (response.status === 401) {
          setErrorMessage('Bad words are not allowed');
          return;
        } else if (response.status === 400) {
          setErrorMessage('Email or username already exists');
        }
      }
    } catch (error) {
      setErrorMessage('Error creating user, please try again later');
    }
  };

  return (
    <Card className='d-flex justify-content-center w-50 mx-auto'>
      <CardBody>
      <CardTitle className='display-4 text-center'>Register</CardTitle>
        {errorMessage && <p class='text-center text-danger'>{errorMessage}</p>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
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
              placeholder="Enter your password"
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
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </FormGroup>
          <Button type="submit" color="primary">
            Register
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};

export default RegisterForm;

