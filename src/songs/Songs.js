import { useState } from "react";
import SearchForm from "./components/SearchForm";
import SongsContainer from "./components/SongsContainer";
import "../css/Songs.css";

function Songs() {
  const [songs, setSongs] = useState([]);
  const [spotifySongs, setSpotifySongs] = useState(null);

  function handleSpotifySearchClick(results) {
    setSongs(results.songs);
    setSpotifySongs(results.spotify);
  }

  return (
    <div>
      <SearchForm
        handleSpotifySearchClick={handleSpotifySearchClick}
      ></SearchForm>
      <SongsContainer songs={songs} spotifySongs={spotifySongs}></SongsContainer>
    </div>
  );
}

export default Songs;
