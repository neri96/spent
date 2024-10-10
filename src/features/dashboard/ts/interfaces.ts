import { FilterAllOrArray } from "@ts/types";
import { SetFilterType } from "./types";

export interface IFilterState {
  transactionType: FilterAllOrArray;
  category: FilterAllOrArray;
}

export interface IFilterGlobalState extends IFilterState {
  date: number[];
}

export interface IFilterLocalState extends IFilterState {
  month: string;
  year: string;
}

export interface IFilterStateProps {
  handleFilterLocalState: SetFilterType;
}

export interface IFilterLocalData {
  filterLocalState: IFilterLocalState;
  handleFilterLocalState: SetFilterType;
}
