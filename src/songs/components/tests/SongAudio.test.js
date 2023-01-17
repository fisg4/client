import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { renderWithProviders } from "../../../utils/test-utils";
import SongAudio from "../SongAudio";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

describe("SongAudio Tests", () => {
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

  it("renders SongAudio component", () => {
    let unmount = null;
    useSelector.mockImplementation((selector) =>
      selector({
        songMedia: {
          audioUrl:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        },
      })
    );

    unmount = renderWithProviders(
      <BrowserRouter>
        <SongAudio />
      </BrowserRouter>,
      { container }
    );
    expect(container.hasChildNodes()).toBe(true);
    expect(container.querySelector("audio")).not.toBeNull();
    unmount.unmount();
  });
});
