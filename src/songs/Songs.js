import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import SongsContainer from "./components/SongsContainer";
import "../css/Songs.css";

function Songs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [songs, setSongs] = useState(location.state?.songs || []);
  const [spotifySongs, setSpotifySongs] = useState(
    location.state?.spotify || null
  );

  useEffect(() => {
    if (songs.length === 0) {
      navigate("/");
    } else {
      setSongs(location.state.songs);
      setSpotifySongs(location.state.spotify);
    }
  }, [songs, navigate, location]);

  return (
    <div>
      <SearchForm></SearchForm>
      <SongsContainer
        songs={songs}
        spotifySongs={spotifySongs}
      ></SongsContainer>
    </div>
  );
}

export default Songs;
