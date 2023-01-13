import EditLyricsModal from "./EditLyricsModal";

function SongLyrics({ song, text }) {

  return (
    <>
      <div className="row">
        <div className="col-6 col-lg-3">
          <h3 className="card-title mt-3">Lyrics</h3>
        </div>
        {text?.lyrics ? (
          <div className="col-6 col-lg-2 d-flex justify-content-end justify-content-lg-start">
            <button className="btn border-purple text-purple bg-blue my-3" data-bs-toggle="modal" data-bs-target="#lyricsModal">
              <i className="bi bi-pencil-square"></i>
            </button>
          </div>
        ) : (
          <></>
        )}
        <EditLyricsModal songId={song?.id} />
      </div>
      {text?.lyrics ? (
        <p className="card-text avoidInline">{text?.lyrics}</p>
      ) : (
        <div>
          <p className="card-text mt-2">No lyrics found</p>
          <button id="add-lyrics-btn" className="btn border-purple text-purple bg-blue" data-bs-toggle="modal" data-bs-target="#lyricsModal">
            Add Lyrics
          </button>
        </div>
      )}
    </>
  );
}

export default SongLyrics;