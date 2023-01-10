import { Link } from "react-router-dom";

function Song({ song, storable }) {
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
            <div className="btnAddSong d-flex justify-content-center align-items-center">
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
    </div>
  );
}

export default Song;
