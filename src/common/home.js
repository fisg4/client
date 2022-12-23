import { useState } from "react";
import SearchForm from "../songs/components/SearchForm";
import SongsContainer from "../songs/components/SongsContainer";

function Home() {
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
      <SongsContainer
        songs={songs}
        spotifySongs={spotifySongs}
      ></SongsContainer>
    </div>
  );
}

export default Home;
