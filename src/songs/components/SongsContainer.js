import Song from "./Song";

function SongsContainer({ songs }) {
  return (
    <div className="songsContainer">
      <div className="row">
        {songs.map((song) => (
          <Song song={song}></Song>
        ))}
      </div>
    </div>
  );
}

export default SongsContainer;
