import { describe, expect, it } from "vitest";

import App from "../src/App";

describe("frontend smoke test", () => {
  it("exports the App component", () => {
    expect(typeof App).toBe("function");
  });
});
