import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount rendered components after each test so tests do not share DOM state.
afterEach(() => {
  cleanup();
});
