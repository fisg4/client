import { useState } from "react";

function SearchForm({ handleSpotifySearchClick }) {
  const [query, setQuery] = useState("");

  async function searchSongOnSpotify() {
    const request = new Request("/api/v1/songs/spotify?title=" + query, {
      method: "GET",
      headers: {},
    });

    const response = await fetch(request);

    if (!response.ok) {
      throw Error("Response not valid. " + response.status);
    }

    const songs = await response.json();

    handleSpotifySearchClick(songs);
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
          >
            <i className="bi bi-search btn-purple"></i>
          </button>
        </div>
      </div>
      <div className="col-4 offset-4 text-center">
        <button
          type="button"
          className="btn border-purple text-purple bg-blue"
          onClick={searchSongOnSpotify}
        >
          Possibility
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
