import "./css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./common/footer";
import Header from "./common/header";
import Home from "./common/home";
import ErrorPage from "./common/errorPage";
import Songs from "./songs/Songs";
import Users from "./users/Users";
import Messages from "./messages/Messages";
import SongDetail from "./songs/components/SongDetail";
import RegisterForm from "./users/RegisterForm";

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
              <Route path="/messages" element={<Messages />} />
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
