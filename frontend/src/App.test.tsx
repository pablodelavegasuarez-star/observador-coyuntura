import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import App from "./App";

test("shows the site title as an accessible level-1 heading", () => {
  render(<App />);

  const heading = screen.getByRole("heading", {
    level: 1,
    name: "Observador de coyuntura",
  });

  expect(heading).toBeInstanceOf(HTMLHeadingElement);
});
