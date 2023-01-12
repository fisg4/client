import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../../common/components/Alert";

function Song({ song, storable }) {
  const [alreadyExists, setAlreadyExists] = useState(false);
  const navigate = useNavigate();

  async function saveSong(song) {
    const request = new Request("/api/v1/songs/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(song),
    });

    const response = await fetch(request);

    if (response.status === 201) {
      const newSong = await response.json();
      navigate(`/songs/${newSong.id}`);
    } else if (response.status === 409) {
      setAlreadyExists(true);
    } else {
      // otro error
    }
  }

  function onAlertClose() {
    setAlreadyExists(false);
  }

  return (
    <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
      <div className="songCard d-flex justify-content-around align-items-center">
        <img
          src={song.albumCover}
          alt={`Album cover of ${song.title}`}
          className="d-none d-md-block img-fluid"
        />
        <div className="d-flex flex-column justify-content-between cardContent">
          <h5 className="cardTitle">{song.title}</h5>
          <p className="cardText">{song.artists.join(", ")}</p>
          <audio controls>
            <source src={song.audioUrl} type="audio/mpeg" />
          </audio>
        </div>
        {storable ? (
          <div>
            <div
              className="btnAddSong d-flex justify-content-center align-items-center"
              onClick={() => saveSong(song)}
            >
              <i className="bi bi-plus-lg"></i>
            </div>
          </div>
        ) : (
          <div>
            <Link to={`/songs/${song.id}`}>
              <div className="btnAddSong d-flex justify-content-center align-items-center">
                <i className="bi bi-music-note-beamed"></i>
              </div>
            </Link>
          </div>
        )}
      </div>
      {alreadyExists ? (
        <Alert
          message={"This song already exists in FastMusik"}
          onClose={onAlertClose}
        />
      ) : null}
    </div>
  );
}

export default Song;
