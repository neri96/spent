import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@app/store";

const initialState: { query: string } = {
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      const value = action.payload;
      state.query = value;
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;

export const selectSearchQuery = (state: RootState) => state.search.query;

export default searchSlice.reducer;
