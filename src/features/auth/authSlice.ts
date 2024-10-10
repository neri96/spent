import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@app/store";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    accessToken: null,
    isAuthenticated: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { userId, accessToken } = action.payload;

      state.userId = userId;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userId = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.userId;
export const selectToken = (state: RootState) => state.auth.accessToken;
