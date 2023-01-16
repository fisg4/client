import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLikeList, setCount } from "../slices/likesSlice";
import Like from "./Like";
import CustomLoader from "../../common/components/CustomLoader";


function LikeList() {
  const { id } = useParams();
  const [likes, setLikes] = useState(null);
  const [song, setSong] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { count } = useSelector((state) => state.likes);

  useEffect(() => {
    async function fetchLikes() {
      const request = new Request(`/api/v1/likes?songId=${id}`, {
        method: "GET",
        headers: {},
      });

      const response = await fetch(request);

      if (!response.ok) {
        navigate("/404");
        throw Error("Response not valid. " + response.status);
      }

      const likes = await response.json();
      setLikes(likes);

      dispatch(setLikeList(likes?.reverse()) || []);
      dispatch(setCount(likes.length) || 0);
    }

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

    if (localStorage.getItem("token")) {
      fetchSong();
      fetchLikes();
    } else {
      navigate("/me");
    }

  }, [id, dispatch, navigate]);

  return (
    <>
      {
        localStorage.getItem("token") && song ? (
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <div className="row">
                  {song?.albumCover && (
                    <div className="col-4 col-lg-3">
                      <img src={song?.albumCover} className="img-fluid shadow" alt="..."></img>
                    </div>
                  )}
                  <div className="col-8 col-lg-9">
                    <h2 className="text-start">
                      {song?.title}
                    </h2>
                    <p className="text-start text-secondary fw-semibold">
                      {song?.artists?.map((artist) => artist).join(", ")}
                    </p>
                  </div>
                </div>
                {count !== 0 && (
                  <div className="row mt-3 border-bottom border-dark border-2">
                    <div className="col-6 text-start">
                      <h6 className="text-secondary">
                        {count} likes
                      </h6>
                    </div>
                    <div className="col-6 text-end align-bottom">
                      <h6 className="text-secondary fw-semibold ">
                        LIKED BY
                      </h6>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="songsContainer">
              {count === 0 ? (
                <div className="row">
                  <div className="col-12">
                    <h3 className="text-center">
                      This song has no likes. Be the first to like it!
                    </h3>
                  </div>
                </div>
              ) : (
                <div className="row">
                  {likes.map((like) => (
                    <Like key={like.id} like={like} song={song}></Like>
                  ))}
                </div>)}
            </div>
          </div>
        ) : (
          <CustomLoader></CustomLoader>
        )
      }
    </>
  );
}

export default LikeList;