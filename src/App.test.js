import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { renderWithProviders } from "./utils/test-utils";
import App from "./App";

test("renders without crashing", () => {
  const div = document.createElement("div");
  const { unmount } = renderWithProviders(<App />, { div });
  unmount();
  unmountComponentAtNode(div);
});
