import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLyrics, setInput } from "../slices/lyricsSlice";
import { setAudioUrl, setVideoUrl } from "../slices/songMediaSlice";
import { youtubeParser } from "./SongVideo";

import LikeButton from "./LikeButton";
import SongLyrics from "./SongLyrics";
import SongAudio from "./SongAudio";
import SongVideo from "./SongVideo";
import DeleteSongButton from "./DeleteSongButton";

function SongDetail() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const dispatch = useDispatch();
  const text = useSelector((state) => state.lyrics);
  const media = useSelector((state) => state.songMedia);

  useEffect(() => {
    async function fetchSong() {
      const request = new Request("/api/v1/songs/" + id, {
        method: "GET",
        headers: {},
      });

      const response = await fetch(request);

      if (!response.ok) {
        throw Error("Response not valid. " + response.status);
      }

      const song = await response.json();
      setSong(song);

      dispatch(setLyrics(song.lyrics || ""));
      dispatch(setInput(song.lyrics || ""));

      dispatch(setAudioUrl(song.audioUrl || ""));
      dispatch(setVideoUrl(song.videoUrl || ""));
    }

    fetchSong();
  }, [id, dispatch]);

  return (
    <div className="row">
      <div className="card border-0 col-8 offset-2card border-0 col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
        <div className="d-flex flex-column">
          <img src={song?.albumCover} className="card-img-top" alt="..." />
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <p>
                <LikeButton id={id} />
              </p>
            </div>
            {JSON.parse(localStorage.getItem("user")).role === 'admin' ? (
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
            {!media?.videoUrl || !youtubeParser(media?.videoUrl) ? (
              <div className="row">
                <div className="col-12">
                  <SongAudio />
                </div>
              </div>
            ) : (
              <></>
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
  );
}

export default SongDetail;
