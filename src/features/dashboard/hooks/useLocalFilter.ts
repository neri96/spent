import { useCallback, useReducer } from "react";

import { useTypedSelector } from "@app/store";

import { selectFilter } from "../slices/filterSlice";

import { getMonthName } from "@common/utils";

import {
  IFilterLocalState,
  IFilterLocalData,
  IFilterGlobalState,
} from "../ts/interfaces";
import { FilterAllOrArray } from "@ts/types";
import { FilterActionType } from "../ts/types";

interface FilterAction {
  type: FilterActionType;
  payload: any;
}

const reducer = (state: IFilterLocalState, action: FilterAction) => {
  const { type, payload } = action;

  switch (type) {
    case FilterActionType.SET_TRANSACTION_TYPE:
      return {
        ...state,
        transactionType: payload,
      };
    case FilterActionType.SET_CATEGORY:
      return {
        ...state,
        category: payload,
      };
    case FilterActionType.SET_YEAR:
      return {
        ...state,
        year: payload,
      };
    case FilterActionType.SET_MONTH:
      return {
        ...state,
        month: payload,
      };
    default:
      return state;
  }
};

const getInitialFilterLocalState = (
  initialState: IFilterGlobalState
): IFilterLocalState => {
  const { date, ...filterProps } = initialState;

  return {
    ...filterProps,
    year: String(new Date().getFullYear()),
    month: getMonthName(),
  };
};

const useLocalFilter = (): IFilterLocalData => {
  const intialFilterGlobalState = useTypedSelector(selectFilter);

  const [filterLocalState, dispatch] = useReducer(
    reducer,
    getInitialFilterLocalState(intialFilterGlobalState)
  );

  const handleFilterLocalState = useCallback(
    (type: FilterActionType) => (payload: string | number | FilterAllOrArray) =>
      dispatch({ type, payload }),
    [dispatch]
  );

  return { filterLocalState, handleFilterLocalState };
};

export default useLocalFilter;
