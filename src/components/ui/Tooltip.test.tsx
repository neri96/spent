import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Tooltip from "./Tooltip";
import IcQuestion from "@assets/icons/question.svg";

describe("Tooltip component", () => {
  test("renders children content", () => {
    render(
      <Tooltip text="tooltip content">
        <button>children</button>
      </Tooltip>
    );

    expect(screen.getByText("children")).toBeInTheDocument();
    expect(screen.queryByText("tooltip content")).not.toBeInTheDocument();
  });

  test("toggle tooltip on mouse events", async () => {
    render(
      <Tooltip text="tooltip content">
        <button>children</button>
      </Tooltip>
    );

    const content = screen.getByText("children");
    await userEvent.hover(content);

    expect(screen.getByText("tooltip content")).toBeInTheDocument();

    await userEvent.unhover(content);

    await waitFor(() =>
      expect(screen.queryByText("tooltip content")).not.toBeInTheDocument()
    );
  });
});

test("displays description icon depending on description prop", async () => {
  const { rerender } = render(
    <Tooltip text="tooltip content">
      <button>children</button>
    </Tooltip>
  );

  const content = screen.getByText("children");
  await userEvent.hover(content);

  expect(screen.getByText("tooltip content")).toBeInTheDocument();

  expect(
    screen.queryByAltText(/Description of tooltip content/i)
  ).not.toBeInTheDocument();

  rerender(
    <Tooltip text="tooltip content" description="brief content description">
      <button>children</button>
    </Tooltip>
  );

  const icon = screen.getByAltText(/Description of tooltip content/i);

  expect(icon).toBeInTheDocument();
  expect(icon).toHaveAttribute("src", IcQuestion);
});

test("toggles description content on button click", async () => {
  const descriptionContent = "Dummy text";

  render(
    <Tooltip text="tooltip content" description={descriptionContent}>
      <button>children</button>
    </Tooltip>
  );

  const content = screen.getByText("children");
  await userEvent.hover(content);

  expect(screen.getByText("tooltip content")).toBeInTheDocument();

  const iconButton = screen.getByRole("button", {
    name: /description of tooltip content/i,
  });

  expect(screen.queryByText(descriptionContent)).not.toBeInTheDocument();

  await userEvent.click(iconButton);

  expect(screen.getByText(descriptionContent)).toBeInTheDocument();

  await userEvent.click(iconButton);

  await waitFor(() =>
    expect(screen.queryByText(descriptionContent)).not.toBeInTheDocument()
  );
});
