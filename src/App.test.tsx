import { describe } from "vitest";
import { render } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders correctly", () => {
    const result = render(<App></App>);
    expect(result).toMatchSnapshot();
  });
});
