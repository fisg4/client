import EditLyricsModal from "./EditLyricsModal";

function SongLyrics({ song, text }) {

  return (
    <>
      <div className="row align-items-end">
        <div className="col-6 col-lg-4 col-xxl-3 mt-3 pe-0">
          <h3 className="card-title">Lyrics</h3>
        </div>
        {localStorage.getItem("token") && text?.lyrics && (
          <div className="col-6 col-lg-2 text-end text-lg-start ps-0">
            <a href="#edit" className="fs-2 darkBlueText" data-bs-toggle="modal" data-bs-target="#lyricsModal">
              <i className="bi bi-pencil-square"></i>
            </a>
          </div>
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