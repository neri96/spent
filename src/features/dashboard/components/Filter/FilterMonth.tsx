import FilterDateDropDown from "./FilterDateDropDown";

import { monthList } from "@constants/dateConst";

import { IFilterStateProps } from "@features/dashboard/ts/interfaces";
import { FilterActionType } from "@features/dashboard/ts/types";

interface IFilterMonthProps extends IFilterStateProps {
  monthLocalState: string;
}

const FilterMonth = ({
  monthLocalState,
  handleFilterLocalState,
}: IFilterMonthProps) => {
  const setYearLocalState = handleFilterLocalState(FilterActionType.SET_MONTH);

  return (
    <FilterDateDropDown
      label="Month"
      data={monthLocalState}
      setData={setYearLocalState}
      options={monthList}
    />
  );
};

export default FilterMonth;
