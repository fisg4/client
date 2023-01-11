import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { renderWithProviders } from "../../../utils/test-utils";
import SongsContainer from "../SongsContainer";
import { BrowserRouter } from "react-router-dom";

describe("Songs Container Tests", () => {
  let songs = null;
  let container = null;

  beforeAll(() => {
    songs = [
      {
        id: "63b8a454fac3382c35bb03a2",
        title: "Nathy Peluso: Bzrp Music Sessions, Vol. 36",
        artists: ["Bizarrap", "NATHY PELUSO"],
        releaseDate: "2020-11-27",
        albumCover:
          "https://i.scdn.co/image/ab67616d0000b273559e8529d086f60e1752930b",
        audioUrl:
          "https://www.youtube.com/watch?v=TiM_TFpT_DE&ab_channel=MTZManuelTurizo",
        spotifyId: "78SeXVRJ7KCqVmOwTiFjnI",
      },
      {
        id: "63b8a454fac0282c35bb03a2",
        title: "Nathy Peluso: Bzrp Music Sessions, Vol. 36",
        artists: ["Bizarrap", "NATHY PELUSO"],
        releaseDate: "2020-11-27",
        albumCover:
          "https://i.scdn.co/image/ab67616d0000b273559e8529d086f60e1752930b",
        audioUrl:
          "https://www.youtube.com/watch?v=TiM_TFpT_DE&ab_channel=MTZManuelTurizo",
        spotifyId: "78SeXVRJ7KCqVmOmTiFjnI",
      },
    ];
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

  it("renders a songs container", () => {
    const { unmount } = renderWithProviders(
      <BrowserRouter>
        <SongsContainer
          songs={songs}
          spotifySongs={true}
          emptyResults={false}
        />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(container.querySelectorAll("h5").length).toBe(2);
    unmount();
  });

  it("renders a songs container with no results", () => {
    const { unmount } = renderWithProviders(
      <BrowserRouter>
        <SongsContainer songs={[]} spotifySongs={false} emptyResults={true} />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(container.querySelector("h3").textContent).toBe("No results found");
    unmount();
  });
});
