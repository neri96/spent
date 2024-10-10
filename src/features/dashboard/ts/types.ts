import { FilterAllOrArray } from "@ts/types";

export enum FilterActionType {
  SET_TRANSACTION_TYPE,
  SET_CATEGORY,
  SET_YEAR,
  SET_MONTH,
}

export type SetFilterPayload = (
  payload: string | number | FilterAllOrArray
) => void;

export type SetFilterType = (type: FilterActionType) => SetFilterPayload;
