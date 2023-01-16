import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { renderWithProviders } from "../../../utils/test-utils";
import DeleteSongButton from "../DeleteSongButton";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("DeleteSongButton Tests", () => {
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

  it("renders DeleteSongButton component with a song", () => {
    let unmount = null;

    useSelector.mockImplementation((selector) =>
      selector({
        songs: {
          songs: [song],
          deleteError: null,
        },
      })
    );

    unmount = renderWithProviders(
      <BrowserRouter>
        <DeleteSongButton songId={song.id} />
      </BrowserRouter>,
      { container }
    );

    expect(container.hasChildNodes()).toBe(true);
    expect(
      container.querySelector("[data-test-id=deleteConfirmBtn]")
    ).toBeInTheDocument();
    unmount.unmount();
  });
});
