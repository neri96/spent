import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AnalyticsReport from "./AnalyticsReport";

const mockData = [
  { id: "1", label: "Revenue", value: 10000, color: "#00ff00" },
  { id: "2", label: "Expenses", value: 5000, color: "#ff0000" },
];

describe("AnalyticsReport Component", () => {
  beforeEach(() => {
    const backdrop = document.createElement("div");
    backdrop.setAttribute("id", "backdrop");
    document.body.appendChild(backdrop);
  });

  afterEach(() => {
    const backdrop = document.querySelector("#backdrop");
    if (backdrop) {
      document.body.removeChild(backdrop);
    }
  });

  it("should open and close the dialog when the button is clicked", async () => {
    render(<AnalyticsReport data={mockData} />);

    const inspectButton = screen.getByAltText("Inspect data");
    userEvent.click(inspectButton);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");

      expect(dialog).toBeInTheDocument();
      expect(screen.getByText("Revenue: 10000$")).toBeInTheDocument();
      expect(screen.getByText("Expenses: 5000$")).toBeInTheDocument();
    });

    const closeButton = screen.getByText("Acknowledged");
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("should open and close the dialog when the backdrop is clicked", async () => {
    render(<AnalyticsReport data={mockData} />);

    const inspectButton = screen.getByAltText("Inspect data");
    userEvent.click(inspectButton);

    await waitFor(() => {
      const dialog = screen.getByRole("dialog");
      expect(dialog).toBeInTheDocument();
    });

    const backdropElement = screen.getByRole("presentation");
    userEvent.click(backdropElement);

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
