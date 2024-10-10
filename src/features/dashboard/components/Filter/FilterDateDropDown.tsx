import { ChangeEvent } from "react";
import styled from "styled-components";

import DropDown from "@components/ui/DropDown";

import { SetFilterPayload } from "@features/dashboard/ts/types";

interface IFilterDropDownProps {
  label: string;
  data: string | number;
  setData: SetFilterPayload;
  options: string[];
}

const StyledDropdownOption = styled.li`
  height: 35px;
  cursor: pointer;
`;

const FilterDateDropDown = ({
  label,
  data,
  setData,
  options,
}: IFilterDropDownProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setData(value);
  };

  return (
    <DropDown title={String(data)} label={label}>
      {options.map((option: string) => {
        return (
          <StyledDropdownOption key={option}>
            <label>
              <input
                type="checkbox"
                checked={data === option}
                name={option}
                value={option}
                onChange={handleChange}
              />
              {option}
            </label>
          </StyledDropdownOption>
        );
      })}
    </DropDown>
  );
};

export default FilterDateDropDown;
