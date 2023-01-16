import React from "react";
import { unmountComponentAtNode } from "react-dom";
import {
  renderWithProviders,
  setLocalStorage,
} from "../../../utils/test-utils";
import SongLyrics from "../SongLyrics";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("SongLyrics Tests", () => {
  const song = {
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
  let container = null;

  beforeEach(() => {
    window.localStorage.clear();
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    useSelector.mockClear();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders SongLyrics component with a song", () => {
    let unmount = null;
    setLocalStorage("token", "abc123abc123abc123abc123abc123abc123abc123");

    useSelector.mockImplementation((selector) =>
      selector({
        lyrics: {
          lyrics: "I'm a little teapot",
          input: "",
          lyricsRequestError: null,
        },
      })
    );

    unmount = renderWithProviders(
      <BrowserRouter>
        <SongLyrics
          song={song}
          text={{
            lyrics: "Lyrics",
            input: "",
            lyricsRequestError: null,
          }}
        />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(container.querySelector("p").className).toBe(
      "card-text avoidInline mt-3"
    );
    unmount.unmount();
  });

  it("renders SongLyrics component without a song", () => {
    let unmount = null;
    setLocalStorage("token", "abc123abc123abc123abc123abc123abc123abc123");

    useSelector.mockImplementation((selector) =>
      selector({
        lyrics: {
          lyricsRequestError: null,
        },
      })
    );

    unmount = renderWithProviders(
      <BrowserRouter>
        <SongLyrics song={song} />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(
      container.querySelector("[data-test-id=addLyricsBtn]").textContent
    ).toBe("Add Lyrics");
    unmount.unmount();
  });

  it("renders SongLyrics component with an error", () => {
    let unmount = null;
    setLocalStorage("token", "abc123abc123abc123abc123abc123abc123abc123");

    useSelector.mockImplementation((selector) =>
      selector({
        lyrics: {
          lyrics: null,
          lyricsRequestError: "Error lyrics",
        },
      })
    );

    unmount = renderWithProviders(
      <BrowserRouter>
        <SongLyrics song={song} />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(
      container.querySelector("[data-test-id=lyricsRequestError]")
    ).not.toBeNull();
    expect(
      container.querySelector("[data-test-id=lyricsRequestError]").textContent
    ).toBe("Error lyrics");
    unmount.unmount();
  });
});
