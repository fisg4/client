import { useSelector } from "react-redux";
import SearchForm from "./components/SearchForm";
import SongsContainer from "./components/SongsContainer";

import "../css/Songs.css";

function Songs() {
  const { songs } = useSelector((state) => state.songs);
  const { spotify } = useSelector((state) => state.songs);
  const { query } = useSelector((state) => state.songs);

  return (
    <div>
      <SearchForm spotifyBtn={true} querySearch={query}></SearchForm>
      <SongsContainer
        songs={songs}
        spotifySongs={spotify}
        emptyResults={songs.length === 0 ? true : false}
      ></SongsContainer>
    </div>
  );
}

export default Songs;
