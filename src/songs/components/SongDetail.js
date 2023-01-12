import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import LikeButton from "./LikeButton";
import SongLyrics from "./SongLyrics";
import { setLyrics, setInput } from "../slices/lyricsSlice";

function SongDetail() {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const dispatch = useDispatch();
  const text = useSelector((state) => state.lyrics);

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
    }

    fetchSong();
  }, [id, dispatch]);

  return (
    <div className="row">
      <div className="col-8 offset-2">
        <div className="d-flex flex-column">
          <img src={song?.albumCover} className="card-img-top" alt="..." />
          <div className="d-flex justify-content-between">
            <p>
              <LikeButton id={id} />
            </p>
          </div>
          <h2 className="card-title">{song?.title}</h2>
          <p className="card-text">{song?.artists.join(", ")}</p>
          <audio controls>
            <source src={song?.audioUrl} type="audio/mpeg" />
          </audio>
          <SongLyrics song={song} text={text} />
        </div>
      </div>
    </div>
  );
}

export default SongDetail;
