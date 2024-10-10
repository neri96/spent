import { InputHTMLAttributes, ElementType, useId } from "react";

import styled from "styled-components";

import Icon from "./Icon";
import Error from "./Error";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  fieldStyles,
  fieldWrapStyles,
  labelStyles,
  customStylesMixin,
} from "@common/styles";

import { ICustomStyles, ICustomStylesSC } from "@ts/interfaces";

export enum FieldType {
  Input,
  Textarea,
  DatePicker,
}

interface FieldProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    ICustomStyles {
  label?: string;
  error?: string;
  icon?: string;
  fieldType?: FieldType;
  selectedDate?: Date;
  onDateChange?: (date: Date | null) => void;
}

const StyledFieldWrap = styled.div<ICustomStylesSC>`
  position: relative;
  ${fieldWrapStyles}
  ${customStylesMixin};
`;

const StyledFieldLabel = styled.label`
  ${labelStyles};
`;

const StyledFieldIcon = styled.div`
  height: 25px;
  position: absolute;
  bottom: 5px;
  left: 12px;
  padding-left: 5px;
`;

const StyledInput = styled.input<{ $isIconIncluded: boolean }>`
  ${fieldStyles};
  padding-left: ${({ $isIconIncluded }) => ($isIconIncluded ? "35px" : "5px")};
`;

const StyledTextarea = styled.textarea`
  ${fieldStyles}
  height: 70px;
  resize: none;
`;

const StyledDatePicker = styled(DatePicker)`
  ${fieldStyles};
  width: 100%;
`;

const Field = ({
  label,
  icon,
  fieldType = FieldType.Input,
  selectedDate,
  error,
  customStyles,
  onDateChange,
  ...props
}: FieldProps) => {
  const randomId = useId();
  const inputId = `${randomId}-input`;
  const errorId = `${randomId}-error`;

  let Component: ElementType;
  const additionalProps: Record<string, unknown> = {};

  switch (fieldType) {
    case FieldType.Input:
      Component = StyledInput;
      break;
    case FieldType.Textarea:
      Component = StyledTextarea;
      break;
    case FieldType.DatePicker:
      Component = StyledDatePicker;
      additionalProps.selected = selectedDate;
      additionalProps.onChange = onDateChange;
      break;
    default:
      Component = StyledInput;
      break;
  }

  return (
    <StyledFieldWrap $customStyles={customStyles}>
      {icon ? (
        <StyledFieldIcon>
          <Icon src={icon} title={`${label} icon`} />
        </StyledFieldIcon>
      ) : null}
      <StyledFieldLabel htmlFor={inputId}>{label}</StyledFieldLabel>
      {error ? <Error errorId={errorId}>{error}</Error> : null}
      <Component
        id={inputId}
        aria-describedby={errorId}
        $isIconIncluded={Boolean(icon)}
        {...props}
        {...additionalProps}
      />
    </StyledFieldWrap>
  );
};

export default Field;
