import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Dialog from "./Dialog";

describe("Dialog component", () => {
  const mockToggleFn = jest.fn();

  test("renders the component with the children content", () => {
    render(
      <Dialog toggle={mockToggleFn}>
        <div data-testid="content">Content</div>
      </Dialog>
    );

    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
  });

  test("invokes the toggle function when the confirmation button is clicked", async () => {
    render(
      <Dialog toggle={mockToggleFn}>
        <div data-testid="content">Content</div>
      </Dialog>
    );

    const btn = screen.getByRole("button", { name: /acknowledged/i });
    await userEvent.click(btn);

    expect(mockToggleFn).toHaveBeenCalled();
  });

  test("does not propagate click events when clicking inside dialog", async () => {
    const handleClick = jest.fn();

    render(
      <div onClick={handleClick}>
        <Dialog toggle={mockToggleFn}>
          <div data-testid="content">Content</div>
        </Dialog>
      </div>
    );

    const dialogElement = screen.getByRole("dialog");
    await userEvent.click(dialogElement);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
