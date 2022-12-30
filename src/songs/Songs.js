import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import SongsContainer from "./components/SongsContainer";
import "../css/Songs.css";

function Songs() {
  const location = useLocation();
  const [songs, setSongs] = useState(location.state?.songs || []);
  const [spotifySongs, setSpotifySongs] = useState(
    location.state?.spotify || null
  );
  const [spotifyBtn, setSpotifyBtn] = useState(false);
  const [emptyResults, setEmptyResults] = useState(false);
  const [query, setQuery] = useState(location.state?.query || "");

  useEffect(() => {
    setSongs(location.state.songs);
    setSpotifySongs(location.state.spotify);
    setSpotifyBtn(true);
    setEmptyResults(false);
    setQuery(location.state.query);
    if (location.state.songs.length === 0) {
      setEmptyResults(true);
    }
  }, [songs, spotifyBtn, location]);

  return (
    <div>
      <SearchForm spotifyBtn={spotifyBtn} querySearch={query}></SearchForm>
      <SongsContainer
        songs={songs}
        spotifySongs={spotifySongs}
        emptyResults={emptyResults}
      ></SongsContainer>
    </div>
  );
}

export default Songs;
