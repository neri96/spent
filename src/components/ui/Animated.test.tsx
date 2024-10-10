import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ReactNode } from "react";

import Animated from "./Animated";

jest.mock("framer-motion", () => ({
  ...jest.requireActual("framer-motion"),
  AnimatePresence: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("Animated component", () => {
  it("renders children when visible", () => {
    render(
      <Animated isVisible={true}>
        <div data-testid="content">Content</div>
      </Animated>
    );

    const child = screen.getByTestId("content");
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent("Content");
  });

  it("does not render children when not visible", () => {
    render(
      <Animated isVisible={false}>
        <div data-testid="content">Content</div>
      </Animated>
    );

    const child = screen.queryByTestId("content");
    expect(child).not.toBeInTheDocument();
  });
});
