import { Link } from "react-router-dom";

function SimpleSong({ song }) {
  return (
            <Link to={`/songs/${song.id}`}>
                <img
                    src={song.albumCover}
                    alt={`Album cover of ${song.title}`}
                    // className="d-none d-md-block img-fluid"
                    style={{ width: "100%", height: "100%" }}
                />
            </Link>
  );
}

export default SimpleSong;
