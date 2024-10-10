import { api } from "./api";

export interface IAnalytics {
  id: string;
  transactionType: string;
  categories: { category: string; totalAmount: number }[];
}

export const analyticsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAnalytics: build.query<IAnalytics[], void>({
      query() {
        return {
          url: "/analytics/get",
          method: "GET",
        };
      },
      providesTags: ["Analytics"],
    }),
  }),
});

export const { useGetAnalyticsQuery } = analyticsApi;
