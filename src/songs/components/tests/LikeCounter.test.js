import React from "react";
import { unmountComponentAtNode } from "react-dom";
import {
  renderWithProviders,
  setLocalStorage,
} from "../../../utils/test-utils";
import LikeCounter from "../LikeCounter";
import { BrowserRouter } from "react-router-dom";

describe("LikeCounter Tests", () => {
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

  it("renders LikeCounter component", () => {
    let unmount = null;
    const songId = "63b8a454fac0282c35bb03a2";

    unmount = renderWithProviders(
      <BrowserRouter>
        <LikeCounter songId={songId} numLikes={3} />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(container.querySelector("span").textContent).toBe("3 likes");

    setLocalStorage("token", "abc123abc123abc123abc123ABC123abc123abc1230123");

    unmount = renderWithProviders(
      <BrowserRouter>
        <LikeCounter songId={songId} numLikes={3} />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(container.querySelector("a").textContent).toBe("3 likes");
    unmount.unmount();
  });
});
