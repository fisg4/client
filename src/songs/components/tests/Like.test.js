import React from "react";
import { unmountComponentAtNode } from "react-dom";
import {
  renderWithProviders,
  setLocalStorage,
} from "../../../utils/test-utils";
import Like from "../Like";
import { BrowserRouter } from "react-router-dom";

describe("Like Tests", () => {
  let container = null;
  beforeEach(() => {
    window.localStorage.clear();
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders Like component", () => {
    let unmount = null;
    const like = {
      user: {
        id: "abc123abc123abc123abc123",
        username: "testuser",
      },
      date: "2023-01-01",
    };
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
    setLocalStorage("user", {
      id: "abc123abc123abc123abc122",
      username: "testuser",
    });

    unmount = renderWithProviders(
      <BrowserRouter>
        <Like like={like} song={song} />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(container.querySelector("h5").textContent).toBe("testuser");
    expect(container.querySelector("h6").textContent.includes("liked")).toBe(
      true
    );

    setLocalStorage("user", {
      id: "abc123abc123abc123abc123",
      username: "testuser",
    });

    unmount = renderWithProviders(
      <BrowserRouter>
        <Like like={like} song={song} />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(container.querySelector("span").textContent).toBe("It's you!");
    unmount.unmount();
  });
});
