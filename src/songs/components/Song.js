function Song({ song }) {
  return (
    <div className="col-8 offset-2">
      <div className="songCard d-flex justify-content-around align-items-center">
        <img
          src={song.albumCover}
          alt={`Album cover of ${song.title}`}
          width="40%"
        />
        <div className="d-flex flex-column justify-content-between cardContent">
          <h5 className="cardTitle">{song.title}</h5>
          <p className="cardText">{song.artists.join(", ")}</p>
          <audio controls>
            <source src={song.url} type="audio/mpeg" />
          </audio>
        </div>
        <div>
          <div className="btnAddSong d-flex justify-content-center align-items-center">
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Song;
