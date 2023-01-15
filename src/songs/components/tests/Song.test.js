import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { renderWithProviders } from "../../../utils/test-utils";
import Song from "../Song";
import { BrowserRouter } from "react-router-dom";

describe("Songs List Tests", () => {
  let song = null;
  let container = null;

  beforeAll(() => {
    song = {
      id: "63b8a454fac0282c35bb03a2",
      title: "Nathy Peluso: Bzrp Music Sessions, Vol. 36",
      artists: ["Bizarrap", "NATHY PELUSO"],
      releaseDate: "2020-11-27",
      albumCover:
        "https://i.scdn.co/image/ab67616d0000b273559e8529d086f60e1752930b",
      audioUrl:
        "https://www.youtube.com/watch?v=TiM_TFpT_DE&ab_channel=MTZManuelTurizo",
      spotifyId: "78SeXVRJ7KCqVmOwTiFjnI",
    };
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders a songs list results from Spotify", () => {
    const { unmount } = renderWithProviders(
      <BrowserRouter>
        <Song song={song} storable={true} />
      </BrowserRouter>,
      { container }
    );
    expect(container.querySelector("h5").textContent).toBe(song.title);
    expect(container.querySelector("p").textContent).toBe(
      song.artists.join(", ")
    );
    expect(container.querySelector("img").src).toBe(song.albumCover);
    expect(container.querySelector("source").src).toBe(song.audioUrl);
    expect(container.querySelector("i").className).toBe("bi bi-plus-lg fs-3");
    unmount();
  });

  it("renders a songs list results from database", () => {
    const { unmount } = renderWithProviders(
      <BrowserRouter>
        <Song song={song} storable={false} />
      </BrowserRouter>,
      { container }
    );
    expect(container.querySelector("i").className).toBe(
      "bi bi-music-note-beamed fs-3"
    );
    unmount();
  });
});
