import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './common/Footer';
import Header from './common/Header';
import Home from './common/Home';
import ErrorPage from './common/ErrorPage';
import Songs from './songs/Songs';
import Users from './users/Users';
import Chats from './messages/Chats';
import SongDetail from "./songs/components/SongDetail";
import RegisterForm from "./users/RegisterForm";
import ActiveChat from './messages/ActiveChat';
import RoomDetails from "./messages/RoomDetails";

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
              <Route exact path="/me" element={<Users />} />
              <Route exact path="/register" element={<RegisterForm />} />
              <Route path="/songs/:id" element={<SongDetail />} />
              <Route path='/chats'>
                <Route index element={<Chats />} />
                <Route path=':id'>
                  <Route index element={<ActiveChat />} />
                  <Route path='details' element={<RoomDetails />} />
                </Route>
              </Route>
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <br />
          </main>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
