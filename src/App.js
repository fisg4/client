import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './common/Footer';
import Header from './common/Header';
import Home from './common/Home';
import ErrorPage from './common/ErrorPage';
import Songs from './songs/Songs';
import Users from './users/Users';
import Messages from './messages/Messages';
import SongDetail from "./songs/components/SongDetail";
import RegisterForm from "./users/RegisterForm";
import ActiveChat from './messages/activeChat/ActiveChat';

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
              <Route path='/messages'>
                <Route index element={<Messages />} />
                <Route path=':id' element={<ActiveChat />} />
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
