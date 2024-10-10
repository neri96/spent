import FilterDateDropDown from "./FilterDateDropDown";

import { IFilterStateProps } from "@features/dashboard/ts/interfaces";
import { FilterActionType } from "@features/dashboard/ts/types";

interface IFilterYearProps extends IFilterStateProps {
  yearLocalState: string;
}

const getRecentYears = () => {
  const currentYear = new Date().getFullYear();
  const recentYear = [];

  for (let i = 0; i < 3; i++) {
    const prevYear = currentYear - i;
    recentYear.push(String(prevYear));
  }

  return recentYear;
};

const FilterYear = ({
  yearLocalState,
  handleFilterLocalState,
}: IFilterYearProps) => {
  const options = getRecentYears();

  const setYearLocalState = handleFilterLocalState(FilterActionType.SET_YEAR);

  return (
    <FilterDateDropDown
      label="Year"
      data={yearLocalState}
      setData={setYearLocalState}
      options={options}
    />
  );
};

export default FilterYear;
