import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DropDown from "./DropDown";

describe("DropDown component", () => {
  const label = "label";
  const title = "title";

  test("toggles the list on click", async () => {
    render(
      <DropDown label={label} title={title}>
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
      </DropDown>
    );

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    const button = screen.getByRole("button", { name: title });
    await userEvent.click(button);

    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await userEvent.click(button);

    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    );
  });

  test("closes the listbox on click outside", async () => {
    render(
      <>
        <div data-testid="outside">outside content</div>
        <DropDown label={label} title={title}>
          <li>item 1</li>
          <li>item 2</li>
          <li>item 3</li>
        </DropDown>
      </>
    );

    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    const button = screen.getByRole("button", { name: title });
    await userEvent.click(button);

    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("outside"));

    await waitFor(() =>
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument()
    );
  });
});
