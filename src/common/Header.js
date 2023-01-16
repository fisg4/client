import React from 'react';
import logo from '../images/fastMusik_logo.png';
import perfil from '../images/user-icon.png';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import TokenListener from './components/TokenListener';
import UsernameListener from './components/UsernameListener';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  if (!user) {
    return (
      <>
        <TokenListener />
        <header className="container">
          <div className="row mt-3">
            <div className="col-2 text-center mt-sm-1">
              <a href="#back" onClick={() => navigate(-1)}>
                <i className="h1 bi bi-chevron-left darkBlueText"></i>
              </a>
            </div>
            <div className="col-8 text-center">
              <Link to="/">
                <img src={logo} className="img-fluid header-logo" alt="FastMusik logo" />
              </Link>
            </div>
            <div className="col-2 text-end py-2">
              <Link to="/me">
                <UsernameListener />
                <img src={perfil} className="img-fluid align-middle header-perfil" alt="Perfil" />
              </Link>
            </div>
          </div>
        </header>
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <TokenListener />
        <header className="container">
          <div className="row mt-3">
            <div className="col-2 text-center mt-sm-1">
              <a href="#back" onClick={() => navigate(-1)}>
                <i className="h1 bi bi-chevron-left darkBlueText"></i>
              </a>
            </div>
            <div className="col-8 text-center">
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