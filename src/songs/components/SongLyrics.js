import { useDispatch, useSelector } from "react-redux";
import { setLyricsRequestError } from "../slices/lyricsSlice";
import EditLyricsModal from "./EditLyricsModal";

function SongLyrics({ song, text }) {
  const dispatch = useDispatch();
  const { lyricsRequestError } = useSelector((state) => state.lyrics);

  function onAlertClose() {
    dispatch(setLyricsRequestError(null));
  }

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
        {lyricsRequestError !== null && (
          <div className="my-3">
            <div className="toast align-items-center border-0 bg-warning show" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="d-flex">
                <div className="toast-body fw-semibold">
                  {lyricsRequestError}
                </div>
                <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"
                  onClick={onAlertClose}></button>
              </div>
            </div>
          </div>
        )}
        <EditLyricsModal songId={song?.id} />
      </div>
      {text?.lyrics ? (
        <p className="card-text avoidInline mt-3">{text?.lyrics}</p>
      ) : (
        <div>
          <p className="card-text mt-2">No lyrics found</p>
          {localStorage.getItem("token") && (
            <button id="add-lyrics-btn" className="btn border-purple text-purple bg-blue" data-bs-toggle="modal" data-bs-target="#lyricsModal">
              Add Lyrics
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default SongLyrics;