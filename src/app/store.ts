import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { api } from "./services/api";

import authPersistMiddleware from "@features/auth/middleware/authPersistMiddleware";

import auth from "@features/auth/authSlice";
import dataDisplay from "@features/dashboard/slices/dataDisplaySlice";
import search from "@features/dashboard/slices/searchSlice";
import filter from "@features/dashboard/slices/filterSlice";

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth,
      dataDisplay,
      search,
      filter,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware, authPersistMiddleware),
    ...options,
  });

export const store = createStore();

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
