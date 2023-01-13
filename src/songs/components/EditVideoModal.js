import { useSelector, useDispatch } from "react-redux";
import { setVideoUrl, setVideoUrlInput } from "../slices/songMediaSlice";

function EditVideoModal({ songId }) {
    const dispatch = useDispatch();
    const media = useSelector((state) => state.songMedia);

    async function addVideo(endpoint, songId, newVideoUrl) {
        const request = new Request(`${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                id: songId,
                videoUrl: newVideoUrl,
            }),
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw Error("Response not valid. " + response.status);
        }

        dispatch(setVideoUrl(newVideoUrl));
    }

    async function sendTicket(endpoint, ticket) {
        const request = new Request(`${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(ticket),
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw Error("Response not valid. " + response.status);
        }

        document.getElementById("toastConfirmation").classList.add("show");
    }

    return (
        <div className="modal fade" id="videoUrlModal" tabIndex="-1" aria-labelledby="videoUrlModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Add music video</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="videoUrlInput"
                                    placeholder="Insert new video url for this song"
                                    aria-label="New video url input"
                                    value={media?.videoUrlInput}
                                    onChange={(e) => dispatch(setVideoUrlInput(e.target.value))}
                                >
                                </input>
                                <label htmlFor="videoUrlInput">Insert new video url for this song</label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        {!media?.videoUrl ? (
                            <button
                                type="button"
                                className="btn border-purple text-purple bg-blue"
                                data-bs-dismiss="modal"
                                onClick={() => addVideo(
                                    "/api/v1/songs",
                                    songId,
                                    document.getElementById("videoUrlInput").value
                                )}
                            >
                                Confirm
                            </button>)
                            : (
                                <button
                                    type="button"
                                    className="btn border-purple text-purple bg-blue"
                                    data-bs-dismiss="modal"
                                    onClick={() => {
                                        if (media?.videoUrlInput !== "" && media?.videoUrlInput !== null && media?.videoUrlInput !== undefined) {
                                            sendTicket(
                                                "/api/v1/songs/ticket",
                                                {
                                                    userId: JSON.parse(localStorage.getItem("user")).id,
                                                    songId: songId,
                                                    videoUrl: document.getElementById("videoUrlInput").value
                                                }
                                            );
                                        }
                                    }}
                                >
                                    Confirm
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditVideoModal;
