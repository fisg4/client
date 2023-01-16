import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAudioUrl, setVideoUrl, setVideoRequestError, setVideoUrlInput } from "../slices/songMediaSlice";
import { setLyrics, setInput, setLyricsRequestError } from "../slices/lyricsSlice";
import { setLikeList, setCount } from "../slices/likesSlice";
import { setDeleteError } from "../slices/songsSlice";
import { youtubeParser } from "./SongVideo";

import CustomLoader from "../../common/components/CustomLoader";
import DeleteSongButton from "./DeleteSongButton";
import LikeButton from "./LikeButton";
import LikeCounter from "./LikeCounter";
import SongLyrics from "./SongLyrics";
import SongAudio from "./SongAudio";
import SongVideo from "./SongVideo";

function SongDetail() {
  const { id } = useParams();
  const [song, setSong] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const text = useSelector((state) => state.lyrics);
  const media = useSelector((state) => state.songMedia);
  const likes = useSelector((state) => state.likes);
  const { deleteError } = useSelector((state) => state.songs);

  useEffect(() => {
    async function fetchSong() {
      const request = new Request("/api/v1/songs/" + id, {
        method: "GET",
        headers: {},
      });

      const response = await fetch(request);

      if (!response.ok) {
        navigate("/404");
        throw Error("Response not valid. " + response.status);
      }

      const song = await response.json();
      setSong(song);

      dispatch(setLyrics(song.lyrics || ""));
      dispatch(setInput(song.lyrics || ""));

      dispatch(setAudioUrl(song.audioUrl || ""));
      dispatch(setVideoUrl(song.videoUrl || ""));
      dispatch(setVideoUrlInput(""));

      dispatch(setDeleteError(null));
      dispatch(setLyricsRequestError(null));
      dispatch(setVideoRequestError(null));

      dispatch(setLikeList(song.likes || []));
      dispatch(setCount(song.likes.length || 0));
    }

    fetchSong();
  }, [id, dispatch, navigate]);

  function onAlertClose() {
    dispatch(setDeleteError(null));
  }

  return (
    <>
      {song ? (
        <div className="row">
          <div className="card border-0 col-8 offset-2card border-0 col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
            <div className="d-flex flex-column">
              <img src={song?.albumCover} className="card-img-top shadow" alt="..." />
              <div className="card-body px-0">
                <div className="d-flex justify-content-between">
                  <p>
                    <LikeButton id={id} />
                    <LikeCounter songId={id} numLikes={likes.count} />
                  </p>
                </div>
                {JSON.parse(localStorage.getItem("user"))?.role === 'admin' ? (
                  <div className="d-flex justify-content-between">
                    <div className="col-10 col-sm-8">
                      <h2 className="card-title">{song?.title}</h2>
                    </div>
                    <div className="col-2 col-sm-4 d-flex justify-content-end">
                      <DeleteSongButton songId={id} />
                    </div>
                  </div>
                ) : (
                  <div className="col-12">
                    <h2 className="card-title">{song?.title}</h2>
                  </div>
                )}
                <p className="card-text">{song?.artists.join(", ")}</p>
                {deleteError !== null && (
                  <div className="my-3">
                    <div className="toast align-items-center border-0 bg-warning show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body fw-semibold">
                          {deleteError}
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"
                          onClick={onAlertClose}></button>
                      </div>
                    </div>
                  </div>
                )}
                {(!media?.videoUrl || !youtubeParser(media?.videoUrl)) && (
                  <div className="row">
                    <div className="col-12">
                      <SongAudio />
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <SongVideo song={song} />
                  </div>
                  <div className="col-12 col-lg-6 order-lg-first">
                    <SongLyrics song={song} text={text} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CustomLoader></CustomLoader>
      )}
    </>
  );
}

export default SongDetail;
