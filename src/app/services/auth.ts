import { api } from "./api";

interface IUserDataResponse {
  username: string;
  budget: number;
  points: number;
  balance: number;
  expenses: number;
}

export interface ILoginInput {
  username: string;
  password: string;
}

export interface IRegisterInput extends ILoginInput {
  confirmPassword: string;
}

interface ITokenResponse {
  userId: string;
  accessToken: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    me: build.query<IUserDataResponse, number[]>({
      query(date) {
        return {
          url: "/user/me",
          method: "GET",
          params: { date },
        };
      },
      providesTags: ["Auth"],
    }),
    register: build.mutation<ITokenResponse, IRegisterInput>({
      query(body) {
        return {
          url: "/user/register",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    login: build.mutation<ITokenResponse, ILoginInput>({
      query(body) {
        return {
          url: "/user/login",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    logout: build.mutation<string, void>({
      query() {
        return {
          url: "/user/logout",
          method: "POST",
          body: {},
        };
      },
      invalidatesTags: ["Auth"],
    }),
    refreshToken: build.mutation<ITokenResponse, void>({
      query(body) {
        return {
          url: "/user/refresh",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = authApi;
