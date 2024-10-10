import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Field, { FieldType } from "./Field";

describe("Field component", () => {
  test("remders the component", () => {
    render(<Field label="label" />);

    const field = screen.getByRole("textbox");
    expect(field).toBeInTheDocument();
  });

  test("renders textarea", () => {
    render(<Field label="label" fieldType={FieldType.Textarea} />);

    const field = screen.getByRole("textbox");
    expect(field).toBeInTheDocument();
    expect(field.tagName).toBe("TEXTAREA");
  });

  test("renders a DatePicker when fieldType is DatePicker", async () => {
    const mockDate = new Date(2022, 5, 22);
    const mockOnDateChange = jest.fn();

    render(
      <Field
        fieldType={FieldType.DatePicker}
        selectedDate={mockDate}
        onDateChange={mockOnDateChange}
        label="label"
      />
    );

    const datePicker = screen.getByRole("textbox");
    expect(datePicker).toBeInTheDocument();

    await userEvent.type(datePicker, "06/22/2022");
    await waitFor(() => expect(mockOnDateChange).toHaveBeenCalled());
  });

  test("renders the component with an icon", () => {
    const label = "username";
    const icon = "user-icon";

    render(<Field label={label} icon={icon} />);

    const iconElement = screen.getByAltText(`${label} icon`);
    expect(iconElement).toBeInTheDocument();
  });

  test("renders the component with an error message", () => {
    const errorMsg = "long error message";

    render(<Field label="label" error={errorMsg} />);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
});
