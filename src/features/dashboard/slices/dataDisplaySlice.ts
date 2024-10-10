import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@app/store";

const initialState: { page: number } = {
  page: 1,
};

const dataDisplaySlice = createSlice({
  name: "dataDisplay",
  initialState,
  reducers: {
    nextPage: (state) => {
      state.page = state.page + 1;
    },
  },
});

export const { nextPage } = dataDisplaySlice.actions;

export const selectPage = (state: RootState) => state.dataDisplay.page;

export default dataDisplaySlice.reducer;
