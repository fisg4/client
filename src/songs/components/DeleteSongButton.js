import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLyrics, setInput } from "../slices/lyricsSlice";
import { setAudioUrl, setVideoUrl } from "../slices/songMediaSlice";
import { setSongs, setDeleteError } from "../slices/songsSlice";

function DeleteSongButton({ songId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const songsState = useSelector((state) => state.songs);

  async function deleteSong(songId) {
    const request = new Request("/api/v1/songs/" + songId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      },
    });

    const response = await fetch(request);

    if (response.ok) {
      dispatch(setDeleteError("There was a problem deleting the song. Try again later."));
      throw Error("Response not valid. " + response.status);
    }

    dispatch(setLyrics(""));
    dispatch(setInput(""));
    dispatch(setAudioUrl(""));
    dispatch(setVideoUrl(""));
    dispatch(setSongs(songsState.songs.filter((song) => song.id !== songId)));
    dispatch(setDeleteError(null));

    navigate("/songs");
  }

  return (
    <>
      <a className="h1 darkBlueText align-top" href="#deleteSong" data-bs-toggle="modal" data-bs-target="#deleteSongModal">
        <i className="bi bi-trash-fill"></i>
      </a>
      <div className="modal fade" id="deleteSongModal" tabIndex="-1" aria-labelledby="deleteSongModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Delete song</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this song?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn border-purple text-purple bg-blue" data-bs-dismiss="modal" onClick={() => deleteSong(songId)}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteSongButton;
