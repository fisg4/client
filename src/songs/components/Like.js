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
          <h6 className="mt-lg-2 text-secondary fw-semibold d-block">liked on {like.date}</h6>
        </div>
        {/* <div className="d-none d-md-block col-md-4">
          <h6 className="text-secondary fw-semibold ">liked on {like.date}</h6>
        </div> */}
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

export default Like;
