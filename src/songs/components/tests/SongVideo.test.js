import React from "react";
import { unmountComponentAtNode } from "react-dom";
import {
  renderWithProviders,
  setLocalStorage,
} from "../../../utils/test-utils";
import SongVideo from "../SongVideo";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

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

describe("SongVideo Tests", () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    useSelector.mockClear();
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders SongVideo component with a videclip", () => {
    let unmount = null;
    setLocalStorage("token", "abc123abc123abc123abc123abc123abc123abc123");

    useSelector.mockImplementation((selector) =>
      selector({
        songMedia: {
          videoUrl:
            "https://www.youtube.com/watch?v=TiM_TFpT_DE&ab_channel=MTZManuelTurizo",
          videoRequestError: null,
        },
      })
    );

    unmount = renderWithProviders(
      <BrowserRouter>
        <SongVideo song={song} />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(container.querySelector("iframe")).not.toBeNull();
    unmount.unmount();
  });

  it("renders SongVideo component without a videclip", () => {
    let unmount = null;
    setLocalStorage("token", "abc123abc123abc123abc123abc123abc123abc123");

    useSelector.mockImplementation((selector) =>
      selector({
        songMedia: {
          videoUrl: null,
          videoRequestError: null,
        },
      })
    );

    unmount = renderWithProviders(
      <BrowserRouter>
        <SongVideo song={song} />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(container.querySelector("iframe")).toBeNull();
    expect(container.querySelector("button").textContent).toBe("Add Video");
    unmount.unmount();
  });
});
