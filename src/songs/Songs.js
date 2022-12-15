import { useState } from "react";
import SearchForm from "./components/SearchForm";
import SongsContainer from "./components/SongsContainer";
import "../css/Songs.css";

function Songs() {
  const [songs, setSongs] = useState([]);

  function handleSpotifySearchClick(results) {
    setSongs(results.songs);
  }

  return (
    <div>
      <SearchForm
        handleSpotifySearchClick={handleSpotifySearchClick}
      ></SearchForm>
      <SongsContainer songs={songs}></SongsContainer>
    </div>
  );
}

export default Songs;
