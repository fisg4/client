import { useSelector, useDispatch } from "react-redux";
import { setVideoUrl, setVideoUrlInput, setVideoRequestError } from "../slices/songMediaSlice";
import { youtubeParser } from "./SongVideo";

function EditVideoModal({ songId }) {
    const dispatch = useDispatch();
    const media = useSelector((state) => state.songMedia);

    async function addVideo(endpoint, songId, newVideoUrl) {
        if (!youtubeParser(newVideoUrl)) {
            dispatch(setVideoRequestError("Please enter a valid YouTube URL."));
            dispatch(setVideoUrlInput(""));
            throw Error("Invalid YouTube URL.");
        }
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
            dispatch(setVideoRequestError("There was a problem adding the video. Please try again."));
            dispatch(setVideoUrlInput(""));
            throw Error("Response not valid. " + response.status);
        }

        dispatch(setVideoUrl(newVideoUrl));
        dispatch(setVideoRequestError(null));
    }

    async function sendTicket(endpoint, ticket) {
        if (!youtubeParser(ticket.videoUrl)) {
            dispatch(setVideoRequestError("Please enter a valid YouTube URL."));
            dispatch(setVideoUrlInput(""));
            throw Error("Invalid YouTube URL.");
        }

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
            dispatch(setVideoRequestError(response.status === 401 ? (
                "You may not have permission to send a support ticket."
            ) : (
                "There was a problem adding the video. Please try again."
            ))
            );
            dispatch(setVideoUrlInput(""));
            throw Error("Response not valid. " + response.status);
        }

        dispatch(setVideoRequestError(null));
        dispatch(setVideoUrlInput(""));
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
                            <div className="form">
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
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        {!media?.videoUrl ? (
                            <button
                                type="button"
                                className="btn border-purple text-purple bg-blue"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    addVideo(
                                        "/api/v1/songs",
                                        songId,
                                        document.getElementById("videoUrlInput").value
                                    )
                                }
                                }

                            >
                                Confirm
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="btn border-purple text-purple bg-blue"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    sendTicket(
                                        "/api/v1/songs/ticket",
                                        {
                                            userId: JSON.parse(localStorage?.getItem("user"))?.id,
                                            songId: songId,
                                            videoUrl: document.getElementById("videoUrlInput").value
                                        }
                                    );

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
