import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './common/Footer';
import Header from './common/Header';
import Home from './common/Home';
import ErrorPage from './common/ErrorPage';
import Songs from './songs/Songs';
import Users from './users/Users';
import Messages from './messages/Messages';
import ActiveChat from './messages/activeChat/ActiveChat';
import Participants from './messages/activeChat/Participants';
import SongDetail from "./songs/components/SongDetail";
import RegisterForm from "./users/RegisterForm";
import LikeButton from './users/components/LikeButton';

function App() {
  return (
    <div className="min-vh-100 d-flex flex-column justify-content-between">
      <BrowserRouter>
        <div>
          <Header />
          <main className="container my-4">
            <Routes>
              <Route index element={<Home />} />
              <Route path="/songs" element={<Songs />} />
              <Route exact path="/login" element={<Users />} />
              <Route exact path="/register" element={<RegisterForm />} />
              <Route path="/songs/:id" element={<SongDetail />} />
              <Route path='/messages' element={<Messages />}/>
              <Route path='/messages/:id' element={<ActiveChat />}/>
              <Route path='/messages/:id/participants' element={<Participants />}/>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <br />
            <div className="col-4 offset-4 text-center">
              <LikeButton />
            </div>
          </main>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
