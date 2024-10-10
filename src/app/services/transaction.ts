import { RootState } from "@app/store";
import { api } from "./api";

import { ITransactionData } from "@ts/interfaces";
import { FilterAllOrArray } from "@ts/types";

interface IFilterOptions {
  transactionType: FilterAllOrArray;
  category: FilterAllOrArray;
  date: number[];
}

interface IGetTransactionParams {
  page: number;
  searchQuery: string;
  filterOptions: IFilterOptions;
}

export const transactionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getOneTransaction: build.query<ITransactionData, string>({
      query(transactionId) {
        return {
          url: "/transaction/one",
          method: "GET",
          params: { transactionId },
        };
      },
      providesTags: ["Transaction"],
    }),
    getTransactions: build.query<
      { transactions: ITransactionData[]; hasNextPage: boolean },
      IGetTransactionParams
    >({
      query({ page, searchQuery, filterOptions }) {
        return {
          url: "/transaction/get",
          method: "GET",
          params: { page, searchQuery, ...filterOptions },
        };
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newTransactions, { arg }) => {
        let matchingCacheItems = [];

        matchingCacheItems = currentCache.transactions.filter(
          (transaction: ITransactionData) => {
            const { transactionType, category, date } = arg.filterOptions;

            const includesTransactionType =
              transactionType === "All" ||
              (Array.isArray(transactionType) &&
                transactionType.includes(transaction.transactionType!));

            const includesCategory =
              category === "All" ||
              (Array.isArray(category) &&
                category.includes(transaction.category!));

            const withinDateRange =
              new Date(transaction.date as Date) >= new Date(date[0]) &&
              new Date(transaction.date as Date) <= new Date(date[1]);

            const notInNewnewTransactions = !newTransactions.transactions.some(
              (newTransaction) => newTransaction.id === transaction.id
            );

            return (
              includesTransactionType &&
              includesCategory &&
              withinDateRange &&
              notInNewnewTransactions
            );
          }
        );

        currentCache.transactions = [
          ...matchingCacheItems,
          ...newTransactions.transactions,
        ];

        if (arg.searchQuery) {
          const searchQuery = arg.searchQuery.toLowerCase();

          matchingCacheItems = currentCache.transactions.filter(
            (transaction) => {
              return (
                transaction.title.toLowerCase().includes(searchQuery) &&
                !newTransactions.transactions.some(
                  (newTransaction) => newTransaction.id === transaction.id
                )
              );
            }
          );

          currentCache.transactions = [
            ...matchingCacheItems,
            ...newTransactions.transactions,
          ];
        } else {
          const uniqueTransactions = newTransactions.transactions.filter(
            (newTransaction) =>
              !currentCache.transactions.some(
                (cachedTransaction) =>
                  cachedTransaction.id === newTransaction.id
              )
          );
          currentCache.transactions.push(...uniqueTransactions);
        }

        currentCache.hasNextPage = newTransactions.hasNextPage;
      },
      forceRefetch({ currentArg, previousArg }) {
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      },
      providesTags: ["Transaction"],
    }),
    createTransaction: build.mutation<string, ITransactionData>({
      query(body) {
        return {
          url: "/transaction/create",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Transaction", "Auth"],
    }),
    updateTransaction: build.mutation<string, ITransactionData>({
      query(body) {
        return {
          url: "/transaction/update",
          method: "PATCH",
          body,
        };
      },
      async onQueryStarted(
        { id, ...patch },
        { dispatch, queryFulfilled, getState }
      ) {
        const state: RootState = getState();

        const queryArgs = {
          page: state.dataDisplay.page,
          searchQuery: state.search.query,
          filterOptions: state.filter,
        };

        const patchResult = dispatch(
          transactionApi.util.updateQueryData(
            "getTransactions",
            queryArgs,
            (draft) => {
              const transaction = draft.transactions.find((t) => t.id === id);

              if (transaction) Object.assign(transaction, patch);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Transaction", "Auth"],
    }),
    deleteTransaction: build.mutation<string, string>({
      query(transactionId) {
        return {
          url: "/transaction/delete",
          method: "DELETE",
          body: { transactionId },
        };
      },
      async onQueryStarted(
        transactionId,
        { dispatch, queryFulfilled, getState }
      ) {
        const state: RootState = getState();

        const queryArgs = {
          page: state.dataDisplay.page,
          searchQuery: state.search.query,
          filterOptions: state.filter,
        };

        const patchResult = dispatch(
          transactionApi.util.updateQueryData(
            "getTransactions",
            queryArgs,
            (draft) => {
              return {
                ...draft,
                transactions: draft.transactions.filter(
                  (t) => t.id !== transactionId
                ),
              };
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Transaction", "Auth"],
    }),
  }),
});

export const {
  useGetOneTransactionQuery,
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;
