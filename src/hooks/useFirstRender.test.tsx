import { render, screen } from "@testing-library/react";

import useFirstRender from "./useFirstRender";

const Component = () => {
  const isFirstRender = useFirstRender();

  return <div>{isFirstRender ? "First" : "Second"}</div>;
};

describe("useFirstRender Hook", () => {
  it("should return 'First' on the first render", () => {
    render(<Component />);
    expect(screen.getByText("First")).toBeInTheDocument();
  });

  it("should return 'Second' after the first render", () => {
    const { rerender } = render(<Component />);
    rerender(<Component />);
    expect(screen.getByText("Second")).toBeInTheDocument();
  });
});
