import Song from "./Song";

function SongsContainer({ songs, spotifySongs }) {
  return (
    <div className="songsContainer">
      <div className="row">
        {songs.map((song) => (
          <Song key={song.spotifyId} song={song} storable={spotifySongs} ></Song>
        ))}
      </div>
    </div>
  );
}

export default SongsContainer;
