import { useSelector, useDispatch } from "react-redux";
import { setVideoRequestError } from "../slices/songMediaSlice";
import EditVideoModal from "./EditVideoModal";

function SongVideo({ song }) {
  const dispatch = useDispatch();
  const { videoUrl, videoRequestError } = useSelector((state) => state.songMedia);
  const videoId = youtubeParser(videoUrl);

  function onAlertClose() {
    dispatch(setVideoRequestError(null));
  }

  return (
    <>
      {videoId !== false ? (
        <>
          <div className="ratio ratio-16x9 mt-lg-3">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="rounded shadow-sm"
              title="Song video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen>
            </iframe>
          </div>
          {localStorage.getItem("token") && (
            <>
              <p className="card-text mt-2">
                Not the right video? <a
                  href="#editVideo"
                  className="darkBlueText text-decoration-none"
                  data-bs-toggle="modal"
                  data-bs-target="#videoUrlModal">
                  Request change</a>
              </p>
              <div id="toastConfirmation" className="toast align-items-center border-purple bg-blue" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                  <div className="toast-body fw-semibold">
                    Your request has been sent. Thank you!
                  </div>
                  <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
              </div>
            </>)}
        </>
      ) : (
        <>
          <h3 className="card-title mt-3">Music video not available</h3>
          {localStorage.getItem("token") && (
            <>
              <p className="card-text mt-2">Would you like to add it?</p>
              <button className="btn border-purple text-purple bg-blue" data-bs-toggle="modal" data-bs-target="#videoUrlModal">
                Add Video
              </button>
            </>
          )}
        </>
      )}
      {videoRequestError !== null && (
        <div className="my-3">
          <div className="toast align-items-center border-0 bg-warning my-3 show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
              <div className="toast-body fw-semibold">
                {videoRequestError}
              </div>
              <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"
                onClick={onAlertClose}></button>
            </div>
          </div>
        </div>
      )}
      <EditVideoModal songId={song?.id} />
    </>
  );
}

function youtubeParser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url?.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}

export { youtubeParser };

export default SongVideo;