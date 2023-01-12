import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';

function DangerousButton() {
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const handleButtonClick = () => {
    setShowInput(true);
    setIsButtonVisible(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem('token');
    const decodedToken = jwtDecode(accessToken);
    const userEmail= decodedToken.email;
    if (code === userEmail) {
        setIsValid(true);
        try {
            const response = await fetch('/api/v1/users/delete', {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${accessToken}`
              },
            });
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    } else {
      setIsValid(false);
      alert('Invalid code');
    }
  };


  return (
    <div>
        {isButtonVisible && (
            <Button type="submit" color="primary" onClick={handleButtonClick} >
                Delete account
            </Button>
        )}
        {showInput && (

        <div div class="mt-2" style={{ display: 'flex', justifyContent: 'center' }}>

        <input
            type="text"
            value={code}
            placeholder="enter your email"
            onChange={e => setCode(e.target.value)}
        />
        &nbsp;
        <Button type="submit" color="primary" onClick={handleSubmit}>
            Confirm
        </Button>
        </div>
        )}
        {isValid && <div>Eliminando cuenta...</div>}
    </div>

  );
        }
export default DangerousButton;
