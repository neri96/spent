import { ChangeEvent } from "react";
import styled from "styled-components";

import DropDown from "@components/ui/DropDown";

import { FilterAllOrArray } from "@ts/types";
import { SetFilterPayload } from "@features/dashboard/ts/types";

interface IFilterDropDownProps {
  label: string;
  data: FilterAllOrArray;
  setData: SetFilterPayload;
  options: string[];
}

const StyledDropdownOption = styled.li`
  height: 35px;
  cursor: pointer;
`;

const FilterDropDown = ({
  label,
  data,
  setData,
  options,
}: IFilterDropDownProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (data === "All" && value === "All") {
      setData([]);
    } else if (data === "All" && value !== "All") {
      setData([...options.filter((option) => option !== value)]);
    } else if (data !== "All" && value === "All") {
      setData("All");
    } else {
      const includes = data.includes(value);
      const newData = includes
        ? [
            ...(data as string[]).filter(
              (dataElem: string) => dataElem !== value
            ),
          ]
        : [...data, value];

      setData(newData.length === options.length ? "All" : newData);
    }
  };

  return (
    <DropDown
      title={typeof data === "string" ? data : data.join(", ")}
      label={label}
    >
      {["All", ...options].map((option: string) => {
        return (
          <StyledDropdownOption key={option}>
            <label>
              <input
                type="checkbox"
                checked={data === "All" ? true : data.includes(option)}
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

export default FilterDropDown;
