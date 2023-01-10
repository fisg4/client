import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import LikeButton from "./LikeButton";

function SongDetail() {
  const { id } = useParams();
  const [song, setSong] = useState(null);

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
    }

    fetchSong();
  }, [id]);

  return (
    <div className="row">
      <div className="col-8 offset-2">
        <div className="d-flex flex-column">
          <img src={song?.albumCover} class="card-img-top" alt="..." />
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
          <div className="d-flex justify-content-between">
            <h3 className="card-title mt-3">Lyrics</h3>
            <button className="btn btn-secondary mt-3">Edit</button>
          </div>
          {song?.lyrics ? (
            <p className="card-text">{song?.lyrics}</p>
          ) : (
            <p className="card-text">No lyrics found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SongDetail;
