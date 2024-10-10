import { render, screen, act } from "@testing-library/react";

import useDebounce from "./useDebounce";

jest.useFakeTimers();

const TestComponent = ({ value, delay }: { value: string; delay: number }) => {
  const debouncedValue = useDebounce(value, delay);
  return <div data-testid="debouncedValue">{debouncedValue}</div>;
};

describe("useDebounce hook", () => {
  it("should return the initial value immediately", () => {
    render(<TestComponent value="initial" delay={500} />);

    expect(screen.getByTestId("debouncedValue").textContent).toBe("initial");
  });

  it("should update the value after the delay", () => {
    const { rerender } = render(<TestComponent value="initial" delay={500} />);

    rerender(<TestComponent value="updated" delay={500} />);

    expect(screen.getByTestId("debouncedValue").textContent).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("debouncedValue").textContent).toBe("updated");
  });

  it("should cancel previous timeout when value changes quickly", () => {
    const { rerender } = render(<TestComponent value="initial" delay={500} />);

    rerender(<TestComponent value="update 1" delay={500} />);
    rerender(<TestComponent value="update 2" delay={500} />);
    rerender(<TestComponent value="update 3" delay={500} />);

    act(() => {
      jest.advanceTimersByTime(499);
    });

    expect(screen.getByTestId("debouncedValue").textContent).toBe("initial");

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(screen.getByTestId("debouncedValue").textContent).toBe("update 3");
  });
});
