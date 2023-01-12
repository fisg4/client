import React, { useState, useEffect } from 'react';
import logo from '../images/fastMusik_logo.svg';
import perfil from '../images/user-icon.png';
import { Link, Outlet } from 'react-router-dom';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
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
              <Link to="/me">
              Log in
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
            {user.username}
              <Link to="/me">
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