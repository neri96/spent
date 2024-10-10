import { render, fireEvent } from "@testing-library/react";

import useToggle from "./useToggle";

const TestComponent = () => {
  const { isActive, toggle, setIsActive } = useToggle();

  return (
    <div>
      <p data-testid="status">{isActive ? "Active" : "Inactive"}</p>
      <button data-testid="toggle-btn" onClick={toggle}>
        Toggle
      </button>
      <button data-testid="activate-btn" onClick={() => setIsActive(true)}>
        Activate
      </button>
      <button data-testid="deactivate-btn" onClick={() => setIsActive(false)}>
        Deactivate
      </button>
    </div>
  );
};

describe("useToggle hook", () => {
  it("should initialize as inactive", () => {
    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId("status").textContent).toBe("Inactive");
  });

  it("should toggle the isActive state when the toggle button is clicked", () => {
    const { getByTestId } = render(<TestComponent />);

    const status = getByTestId("status");
    const toggleBtn = getByTestId("toggle-btn");

    fireEvent.click(toggleBtn);
    expect(status.textContent).toBe("Active");

    fireEvent.click(toggleBtn);
    expect(status.textContent).toBe("Inactive");
  });

  it("should set isActive directly using setIsActive", () => {
    const { getByTestId } = render(<TestComponent />);

    const status = getByTestId("status");
    const activateBtn = getByTestId("activate-btn");
    const deactivateBtn = getByTestId("deactivate-btn");

    fireEvent.click(activateBtn);
    expect(status.textContent).toBe("Active");

    fireEvent.click(deactivateBtn);
    expect(status.textContent).toBe("Inactive");
  });
});
