import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@app/store";

import { IFilterGlobalState } from "../ts/interfaces";

export const initialFilterState: IFilterGlobalState = {
  transactionType: "All",
  category: "All",
  date: [
    dayjs().startOf("day").startOf("month").valueOf(),
    dayjs().endOf("day").endOf("month").valueOf(),
  ],
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    setTransactionType: (state, action) => {
      state.transactionType = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setTransactionType, setCategory, setDate } = filterSlice.actions;
export default filterSlice.reducer;

export const selectFilter = (state: RootState): IFilterGlobalState =>
  state.filter;

export const selectTransactionType = (state: RootState) =>
  state.filter.transactionType;
export const selectCategory = (state: RootState) => state.filter.category;
export const selectDate = (state: RootState) => state.filter.date;
