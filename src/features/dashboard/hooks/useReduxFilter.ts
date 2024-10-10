import { useState } from "react";

import { useAppDispatch, useTypedSelector } from "@app/store";
import {
  selectFilter,
  setTransactionType,
  setCategory,
  setDate,
} from "@features/dashboard/slices/filterSlice";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import { monthOrder } from "@constants/dateConst";

import { IFilterGlobalState, IFilterLocalState } from "../ts/interfaces";

type FilterErrorType = Partial<IFilterGlobalState>;

const useReduxFilter = (
  filterLocalState: IFilterLocalState
): {
  error: FilterErrorType;
  handleFilterReduxState: (filterLocalState: IFilterLocalState) => void;
} => {
  const dispatch = useAppDispatch();
  const filterState = useTypedSelector(selectFilter);

  const [error, setError] = useState<FilterErrorType>({});

  const validateFilterForm = () => {
    const filterStateKeys = Object.keys(filterState);

    for (const key of filterStateKeys) {
      const filterValue = filterLocalState[key as keyof IFilterLocalState];

      if (!filterValue || !(filterValue as string[]).length) {
        setError({ ...error, [key]: "Pick at least one option" });
      }
    }

    return Object.keys(error).length ? false : true;
  };

  const handleFilterReduxState = () => {
    const isValid = validateFilterForm();

    if (!isValid) return;

    const { transactionType, category, year, month } = filterLocalState;

    const monthIndex = monthOrder[month as keyof typeof monthOrder];

    const date = [
      dayjs().month(monthIndex).year(+year).startOf("month").valueOf(),
      dayjs().month(monthIndex).year(+year).endOf("month").valueOf(),
    ];

    dispatch(setTransactionType(transactionType));
    dispatch(setCategory(category));
    dispatch(setDate(date));
  };

  return { error, handleFilterReduxState };
};

export default useReduxFilter;
