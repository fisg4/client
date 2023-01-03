import './css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './common/footer';
import Header from './common/header';
import Home from './common/home';
import ErrorPage from './common/errorPage';
import Songs from './songs/Songs';
import Users from './users/Users';
import Messages from './messages/Messages';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between">
        <BrowserRouter>
          <Header />
          <main className="container my-4">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/songs" element={<Songs />} />
              <Route exact path="/login-page" element={<Users />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
