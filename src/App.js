import logo from './images/fastMusik_logo.svg';
import perfil from './images/perfil.png';
import './css/App.css';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between">
      <header className="container">
          <div className="row mt-3">
            <div className="col-8 offset-2 text-center">
              <a href="http://localhost:3000/">
                <img src={logo} className="img-fluid header-logo" alt="FastMusik logo" />
              </a>
            </div>
            <div className="col-2 text-end py-2">
              <a href="http://localhost:3000/">
                <img src={perfil} className="img-fluid align-middle header-perfil" alt="Perfil Photo" />
              </a>
            </div>
          </div>
      </header>
      <main className="container my-4">

        <div className="row">
          <div className="col-8 offset-2">
            <div className="input-group mb-3">
              <input type="text" className="form-control border-purple" placeholder="Search song" aria-label="Songs name" aria-describedby="Songs name" />
              <button className="btn border-purple text-purple" type="button" id="button-addon2"><i className="bi bi-search btn-purple"></i></button>
            </div>
          </div>
          <div className="col-4 offset-4 text-center">
            <button type="button" className="btn border-purple text-purple bg-blue">Possibility</button>
          </div>
        </div>

      </main>
      <footer className="text-center">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item"><a href="http://localhost:3000/" className="nav-link px-2 text-muted">Agreements</a>
          </li>
          <li className="nav-item"><a href="http://localhost:3000/" className="nav-link px-2 text-muted">Pricing</a></li>
          <li className="nav-item"><a href="http://localhost:3000/" className="nav-link px-2 text-muted">Contact us</a></li>
        </ul>
        <p>© 2022 FastMusik app</p>
      </footer>
    </div>
  );
}

export default App;
