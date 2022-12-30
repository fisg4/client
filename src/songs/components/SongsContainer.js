import Song from "./Song";

function SongsContainer({ songs, spotifySongs, emptyResults }) {
  return (
    <div className="songsContainer">
      {emptyResults && (
        <div className="row">
          <div className="col-12">
            <h3 className="text-center">No results found</h3>
          </div>
        </div>
      )}
      <div className="row">
        {songs.map((song) => (
          <Song key={song.spotifyId} song={song} storable={spotifySongs}></Song>
        ))}
      </div>
    </div>
  );
}

export default SongsContainer;
