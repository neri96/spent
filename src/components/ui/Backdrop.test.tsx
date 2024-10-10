import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Backdrop from "./Backdrop";
import "@testing-library/jest-dom";

describe("Backdrop component", () => {
  const toggle = jest.fn();

  beforeAll(() => {
    const backdropRoot = document.createElement("div");
    backdropRoot.setAttribute("id", "backdrop");
    document.body.appendChild(backdropRoot);
  });

  afterEach(() => {
    toggle.mockClear();
    document.body.style.overflow = "auto";
  });

  it("renders backdrop in portal when open", () => {
    render(
      <Backdrop isOpen={true} toggle={toggle}>
        <p data-testid="content">Backdrop Content</p>
      </Backdrop>
    );

    const content = screen.getByTestId("content");
    expect(content).toBeInTheDocument();
  });

  it("does not render backdrop when closed", () => {
    render(
      <Backdrop isOpen={false} toggle={toggle}>
        <p data-testid="content">Backdrop Content</p>
      </Backdrop>
    );

    const content = screen.queryByTestId("content");
    expect(content).not.toBeInTheDocument();
  });

  it("sets body overflow to hidden when open", () => {
    render(
      <Backdrop isOpen={true} toggle={toggle}>
        <p data-testid="content">Backdrop Content</p>
      </Backdrop>
    );

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("sets body overflow to auto when closed", () => {
    render(
      <Backdrop isOpen={false} toggle={toggle}>
        <p data-testid="content">Backdrop Content</p>
      </Backdrop>
    );

    expect(document.body.style.overflow).toBe("auto");
  });

  it("closes when clicking on backdrop", async () => {
    render(
      <Backdrop isOpen={true} toggle={toggle}>
        <p data-testid="content">Backdrop Content</p>
      </Backdrop>
    );

    await userEvent.click(screen.getByRole("presentation"));

    expect(toggle).toHaveBeenCalledTimes(1);
  });

  it("closes when pressing the Escape key", async () => {
    render(
      <Backdrop isOpen={true} toggle={toggle}>
        <p data-testid="content">Backdrop Content</p>
      </Backdrop>
    );

    await userEvent.keyboard("{Escape}");

    expect(toggle).toHaveBeenCalledTimes(1);
  });
});
