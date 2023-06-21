import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Footer test", () => {
  beforeEach(() => {
    render(<App></App>);
  });

  test("should show app name", () => {
    expect(screen.getByText(/pitch memory/i)).toBeDefined();
  });

  test("should show name in footer", () => {
    expect(screen.getByText(/keyxcode/i)).toBeDefined();
  });
});
