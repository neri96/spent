import { useId, SelectHTMLAttributes } from "react";

import styled from "styled-components";

import { fieldWrapStyles, fieldStyles, labelStyles } from "@common/styles";

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  list: string[];
}

const StyledSelectWrap = styled.div`
  ${fieldWrapStyles}
`;

const StyledSelectLabel = styled.label`
  ${labelStyles}
`;

const StyledSelect = styled.select`
  height: 25px;
  cursor: pointer;
  ${fieldStyles}
`;

const StyledOption = styled.option``;

const Select = ({ label, list, ...props }: ISelectProps) => {
  const selectId = useId();

  return (
    <StyledSelectWrap>
      <StyledSelectLabel htmlFor={selectId}>{label}</StyledSelectLabel>
      <StyledSelect id={selectId} {...props}>
        {list.map((option: string) => {
          return (
            <StyledOption key={option} value={option}>
              {option}
            </StyledOption>
          );
        })}
      </StyledSelect>
    </StyledSelectWrap>
  );
};

export default Select;
