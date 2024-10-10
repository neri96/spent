import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { setCredentials, logout } from "@features/auth/authSlice";

import { RootState } from "@app/store";

import queryString from "query-string";

import { toast } from "react-toastify";

const handleError = (message?: string) => {
  toast.error(message || "Something went wrong", {
    position: "top-right",
    autoClose: 5000,
  });
};

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  paramsSerializer: (params) =>
    queryString.stringify(params, { arrayFormat: "bracket" }),
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery(
      {
        url: "/user/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        api.dispatch(logout());

        const errorData = refreshResult.error.data as { message: string };

        errorData.message = "Your token has expired";
      }
      return refreshResult;
    }
  }

  if (result.error && "data" in result.error) {
    const errorData = result.error.data as { message: string };

    handleError(errorData.message);
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Transaction", "Analytics"],
  endpoints: () => ({}),
});
