import CreateChatButton from "../../messages/components/createChatButton";

function Like({ like, song }) {

  return (
    <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
      <div className="likeCard bg-blue row d-flex align-items-center">
        <div className="col-2">
          <i className="h1 bi bi-person-circle"></i>
        </div>
        <div className="col-8 col-sm-5">
          <h5 className="mt-lg-2 ms-lg-1">{like.user.username.split("@")[0]}</h5>
          <h6 className="mt-lg-2 text-secondary fw-semibold d-block">liked {timeSince(like.date)}</h6>
        </div>
        {like.user.id !== JSON.parse(localStorage.getItem("user")).id ? (
          <div className="col-2 col-sm-5 d-flex justify-content-end">
            <CreateChatButton song={song} participantId={like.user.id} />
          </div>
        ) : (
          <div className="col-2 col-sm-5 d-flex justify-content-end">
            <h5>
              <span className="badge bgDarkBlue fw-semibold py-2">It's you!</span>
            </h5>
          </div>
        )}
      </div>
    </div>

  );
}

function sq(num) {
  return num * num;
}

function timeSince(date) {

  const times = {
    "min": 60,
    "hour": sq(60),
    "day": (sq(60) * 24),
    "week": (sq(60) * 24 * 7),
    "month": (sq(60) * 24 * 7 * 4),
    "year": (sq(60) * 24 * 7 * 4 * 12)
  };

  let num = 0;
  let unit = "";

  if (!date) return "";
  let d = new Date(date),
    diff = ((Date.now() - d.getTime()) / 1000);

  if (diff < times.min) {
    num = Math.floor(diff);
    unit = num > 1 ? " secs ago" : " now";
  } else if (diff < times.hour) {
    num = Math.floor(diff / times.min)
    unit = num > 1 ? " mins ago" : " min ago";
  } else if (diff < times.day) {
    num = Math.floor(diff / times.hour)
    unit = num > 1 ? " hours ago" : " hour ago";
  } else if (diff < times.week) {
    num = Math.floor(diff / times.day)
    unit = num > 1 ? " days ago" : " day ago";
  } else if (diff < times.month) {
    num = Math.floor(diff / times.week)
    unit = num > 1 ? " weeks ago" : " week ago";
  } else if (diff < times.year) {
    num = Math.floor(diff / times.month)
    unit = num > 1 ? " months ago" : " month ago";
  } else {
    num = Math.floor(diff / times.year)
    unit = num > 1 ? " years ago" : " year ago";
  }
  return num + unit;
};

export default Like;
