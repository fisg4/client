import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSongs, toggleSpotify, saveQuery, setQueryError } from "../slices/songsSlice";
import CustomLoader from "../../common/components/CustomLoader";

function SearchForm({ spotifyBtn = false, querySearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(querySearch);
  const { queryError } = useSelector((state) => state.songs);

  async function searchSongs(endpoint, spotify) {
    let songsLoader = document.getElementById("songsLoader");
    !(spotify && !query) && songsLoader.classList.remove("d-none");

    let songs = [];
    const request = new Request(`${endpoint}${query}`, {
      method: "GET",
      headers: {},
    });

    const response = await fetch(request);

    if (!response.ok) {
      dispatch(setQueryError(response.status));
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
    songsLoader.classList.add("d-none");
    navigate("/songs");
  }

  function onAlertClose() {
    dispatch(setQueryError(null));
  }

  return (
    <>
      <div className="row">
        <div className="col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control border-blue border-2px text-blue rounded-3"
              placeholder="Search song"
              aria-label="Songs name"
              aria-describedby="Songs name"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button
              className="btn bg-blue border-blue border-2px text-purple rounded-3 ms-1"
              type="button"
              id="button-addon2"
              title="Search"
              onClick={() => searchSongs("/api/v1/songs?title=", false)}
            >
              <i className="bi bi-search btn-purple"></i>
            </button>
          </div>
        </div>
        {queryError && (
          <div className="mx-2 mb-4 mt-2 d-flex justify-content-center">
            <div className="toast align-items-center border-0 bg-warning show" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="d-flex">
                <div className="toast-body fw-semibold">
                  {queryError === 400 ? "Please, enter a valid song name" : "Something went wrong. Please, try again later"}
                </div>
                <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"
                  onClick={onAlertClose}></button>
              </div>
            </div>
          </div>
        )
        }
        {spotifyBtn && (
          <div className="col-8 offset-2 col-sm-6 offset-sm-3 col-md-4 offset-md-4 text-center">
            <button
              type="button"
              className="btn border-blue text-blue bg-blue fw-semibold"
              onClick={() => searchSongs("/api/v1/songs/spotify?title=", true)}
            >
              <i className="bi bi-spotify"></i> Search on Spotify
            </button>
          </div>
        )}
      </div>
      <div id="songsLoader" className="d-none my-3">
        <CustomLoader></CustomLoader>
      </div>
    </>
  );
}

export default SearchForm;
