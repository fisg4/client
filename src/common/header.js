import React, { useState, useEffect } from 'react';
import Users from '../users/Users';
import logo from '../images/fastMusik_logo.svg';
import perfil from '../images/user-icon.png';
import { Link, Outlet } from 'react-router-dom';

function Header() {
  const token = localStorage.getItem('token');
  const [username, setUsername] = useState(null); // Update initial value to an empty object
  
  async function getUsername() {
    const response = await fetch('/api/v1/users/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    console.log(data);
    setUsername(data.username);
  }

  if (!token) {
    return (
      <>
        <header className="container">
          <div className="row mt-3">
            <div className="col-8 offset-2 text-center">
              <Link to="/">
                <img src={logo} className="img-fluid header-logo" alt="FastMusik logo" />
              </Link>
            </div>
            <div className="col-2 text-end py-2">
              <Link to="/login-page">
                <img src={perfil} className="img-fluid align-middle header-perfil" alt="Perfil" />
              </Link>
            </div>
          </div>
      </header>

      <Outlet />
    </>
    );
  }else{
    return (
      <>
        <header className="container">
          <div className="row mt-3">
            <div className="col-8 offset-2 text-center">
              <Link to="/">
                <img src={logo} className="img-fluid header-logo" alt="FastMusik logo" />
              </Link>
            </div>
            <div className="col-2 text-end py-2">
              <Link to="/login-page">
                <img src={perfil} className="img-fluid align-middle header-perfil" alt="Perfil" />
              </Link>
            </div>
          </div>
      </header>

      <Outlet />
    </>
    );
  }
}

export default Header;