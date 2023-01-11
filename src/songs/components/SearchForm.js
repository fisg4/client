import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSongs, toggleSpotify, saveQuery } from "../slices/songsSlice";

function SearchForm({ spotifyBtn = false, querySearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(querySearch);

  async function searchSongs(endpoint, spotify) {
    let songs = [];
    const request = new Request(`${endpoint}${query}`, {
      method: "GET",
      headers: {},
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw Error("Response not valid. " + response.status);
    }

    if (spotify) {
      songs = await response.json();
      dispatch(toggleSpotify(true));
    } else {
      songs = response.status === 200 ? await response.json() : [];
      dispatch(toggleSpotify(false));
    }
    dispatch(setSongs(songs));
    dispatch(saveQuery(query));

    navigate("/songs");
  }

  return (
    <div className="row">
      <div className="col-8 offset-2">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control border-purple"
            placeholder="Search song"
            aria-label="Songs name"
            aria-describedby="Songs name"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            className="btn border-purple text-purple"
            type="button"
            id="button-addon2"
            title="Search"
            onClick={() => searchSongs("/api/v1/songs?title=", false)}
          >
            <i className="bi bi-search btn-purple"></i>
          </button>
        </div>
      </div>
      {spotifyBtn && (
        <div className="col-4 offset-4 text-center">
          <button
            type="button"
            className="btn border-purple text-purple bg-blue"
            onClick={() => searchSongs("/api/v1/songs/spotify?title=", true)}
          >
            Search on Spotify
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchForm;
