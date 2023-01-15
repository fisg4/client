import { Link } from "react-router-dom";

function LikeCounter({ songId, numLikes }) {

  return (
    <>
      {localStorage.getItem('token') ? (
        <Link to={`/songs/${songId}/likes`}
          className="h4 link-dark text-decoration-none"
        >{numLikes === 1 ? `${numLikes} like` : `${numLikes} likes`}
        </Link>
      ) : (
        <span className="h4 link-dark text-decoration-none">{numLikes} likes</span>
      )}
    </>
  );
}

export default LikeCounter;