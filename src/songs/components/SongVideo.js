import { useSelector } from "react-redux";
import EditVideoModal from "./EditVideoModal";

function SongVideo({ song }) {
  const media = useSelector((state) => state.songMedia);
  const videoId = youtubeParser(media.videoUrl);

  return (
    <>
      {videoId !== false ? (
        <>
          <div class="ratio ratio-16x9 mt-lg-3">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Song video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
            </iframe>
          </div>
          <p className="card-text mt-2">
            Not the right video? <a
              href="#editVideo"
              className="darkBlueText"
              data-bs-toggle="modal"
              data-bs-target="#videoUrlModal">
              Request change</a>
          </p>
          <div id="toastConfirmation" class="toast align-items-center border-purple bg-blue" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
              <div class="toast-body">
                Your request has been sent. Thank you!
              </div>
              <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h3 className="card-title mt-3">Music video not available</h3>
          <p className="card-text mt-2">Would you like to add it?</p>
          <button className="btn border-purple text-purple bg-blue" data-bs-toggle="modal" data-bs-target="#videoUrlModal">
            Add Video
          </button>
        </div>
      )}
      <EditVideoModal songId={song?.id} />
    </>
  );
}

function youtubeParser(url) {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
}

export default SongVideo;