import { useSelector, useDispatch } from "react-redux";
import { setLyrics, setInput } from "../slices/lyricsSlice";

function EditLyricsModal({ songId }) {
    const dispatch = useDispatch();
    const lyricsState = useSelector((state) => state.lyrics);

    async function editLyrics(endpoint, songId, newLyrics) {
        const request = new Request(`${endpoint}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTYzYzVlMDcyMjFjMzM2ODM4NzUyZiIsInJvbGUiOiJ1c2VyIiwicGxhbiI6ImZyZWUiLCJ1c2VybmFtZSI6Im1ydWFubyIsImVtYWlsIjoibXJ1YW5vQHVzLmVzIiwiaWF0IjoxNjcxODc5ODMwfQ.EDfJ-XZHpdEeIMQtlU83hlMo-1aV3fWLPQDeajeCpB0`,
            },
            body: JSON.stringify({
                id: songId,
                lyrics: newLyrics,
            }),
        });

        const response = await fetch(request);

        if (!response.ok) {
            throw Error("Response not valid. " + response.status);
        }

        dispatch(setLyrics(newLyrics));

    }

    return (
        <>
            <div className="modal fade" id="lyricsModal" tabIndex="-1" aria-labelledby="lyricsModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New lyrics</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-floating">
                                    <textarea
                                        className="form-control"
                                        placeholder="Leave a comment here"
                                        id="lyricsTextarea"
                                        style={{ height: "600px" }}
                                        value={lyricsState.input}
                                        onChange={(e) => dispatch(setInput(e.target.value)) }
                                        >
                                    </textarea>
                                    <label htmlFor="lyricsTextarea">Insert new lyrics for this song</label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn border-purple text-purple bg-blue"
                                data-bs-dismiss="modal"
                                onClick={() => editLyrics(
                                    "/api/v1/songs",
                                    songId,
                                    document.getElementById("lyricsTextarea").value
                                )}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditLyricsModal;
