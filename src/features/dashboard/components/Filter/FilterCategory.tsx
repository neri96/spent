import { useState, useEffect } from "react";

import FilterDropDown from "./FilterDropDown";

import { IFilterStateProps } from "@features/dashboard/ts/interfaces";
import {
  IncomeType,
  ExpenseType,
  InvestmentType,
  FilterAllOrArray,
} from "@ts/types";
import { FilterActionType } from "@features/dashboard/ts/types";

interface IFilterCategoryProps extends IFilterStateProps {
  transactionTypeLocalState: FilterAllOrArray;
  categoryLocalState: FilterAllOrArray;
}

const toArray = <T extends Record<string, string>>(data: T): string[] => {
  return Object.values(data);
};

const incomeData = toArray(IncomeType);
const expenseData = toArray(ExpenseType);
const investmentData = toArray(InvestmentType);

const categoryData: Record<string, string[]> = {
  income: incomeData,
  expense: expenseData,
  investment: investmentData,
};

const FilterCategory = ({
  transactionTypeLocalState,
  categoryLocalState,
  handleFilterLocalState,
}: IFilterCategoryProps) => {
  const [options, setOptions] = useState([
    ...new Set([...incomeData, ...expenseData, ...investmentData]),
  ]);

  const setCategoryLocalState = handleFilterLocalState(
    FilterActionType.SET_CATEGORY
  );

  useEffect(() => {
    if (transactionTypeLocalState === "All") {
      setCategoryLocalState("All");
    } else {
      let newCategoryOptionsList: string[] = [];

      transactionTypeLocalState.forEach((transactionType: string) => {
        const currentCategory = categoryData[transactionType.toLowerCase()];

        newCategoryOptionsList = newCategoryOptionsList.concat(currentCategory);
      });

      setOptions([...new Set(newCategoryOptionsList)]);
    }
  }, [transactionTypeLocalState]);

  return (
    <FilterDropDown
      label="Category"
      data={categoryLocalState}
      setData={setCategoryLocalState}
      options={options}
    />
  );
};

export default FilterCategory;
