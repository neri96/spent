import { useAppDispatch, useTypedSelector } from "@app/store";

import {
  selectPage,
  nextPage,
} from "@features/dashboard/slices/dataDisplaySlice";
import { selectSearchQuery } from "@features/dashboard/slices/searchSlice";
import { selectFilter } from "@features/dashboard/slices/filterSlice";

import { useGetTransactionsQuery } from "@app/services/transaction";

import styled from "styled-components";

import ItemDetails from "./ItemDetails";
import ItemColumnHeader from "./ItemColumnHeader";
import ErrorFetch from "@components/ui/ErrorFetch";

import useInfiniteScroll from "@hooks/useInfiniteScroll";

const StyledItemList = styled.ul`
  flex: 1;
  overflow-y: auto;
  padding-right: 5px;
  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const ItemList = () => {
  const dispatch = useAppDispatch();

  const page = useTypedSelector(selectPage);
  const searchQuery = useTypedSelector(selectSearchQuery);
  const filterOptions = useTypedSelector(selectFilter);

  const { data, isError, isFetching } = useGetTransactionsQuery({
    page,
    searchQuery,
    filterOptions,
  });

  if (isError)
    return (
      <ErrorFetch message="Failed to load data. Please try again later." />
    );

  const { transactions, hasNextPage } = data || {};

  const lastItemRef = useInfiniteScroll({
    isFetching,
    hasNextPage: Boolean(hasNextPage),
    flipPage: () => dispatch(nextPage()),
  });

  return (
    <>
      <ItemColumnHeader />
      <StyledItemList>
        {transactions?.map((transaction, index) => {
          const isLastItem = index === transactions.length - 1;

          return (
            <ItemDetails
              key={transaction.id}
              ref={isLastItem && transactions.length >= 10 ? lastItemRef : null}
              data={transaction}
            />
          );
        })}
      </StyledItemList>
    </>
  );
};

export default ItemList;
