import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { renderWithProviders } from "../../../utils/test-utils";
import SearchForm from "../SearchForm";
import { BrowserRouter } from "react-router-dom";

describe("Search Song Tests", () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders a search form", () => {
    const { unmount } = renderWithProviders(
      <BrowserRouter>
        <SearchForm />
      </BrowserRouter>,
      { container }
    );
    expect(container.querySelector("input").placeholder).toBe("Search song");
    expect(container.querySelector("button#button-addon2").title).toBe(
      "Search"
    );
    unmount();
  });

  it("renders a search form with query", () => {
    const { unmount } = renderWithProviders(
      <BrowserRouter>
        <SearchForm querySearch="Nathy Peluso" />
      </BrowserRouter>,
      { container }
    );
    expect(container.querySelector("input").value).toBe("Nathy Peluso");
    unmount();
  });

  it("renders a search form with spotify button", () => {
    const { unmount } = renderWithProviders(
      <BrowserRouter>
        <SearchForm spotifyBtn={true} />
      </BrowserRouter>,
      { container }
    );
    expect(container.querySelector("button.bg-blue.fw-semibold").innerHTML).toBe(
      '<i class="bi bi-spotify"></i> Search on Spotify'
    );
    unmount();
  });
});
