import { FormEvent } from "react";

import styled from "styled-components";

import Modal from "@components/ui/Modal";

import FilterTransaction from "./FilterTransaction";
import FilterCategory from "./FilterCategory";
import FilterYear from "./FilterYear";
import FilterMonth from "./FilterMonth";

import useLocalFilter from "@features/dashboard/hooks/useLocalFilter";
import useReduxFilter from "@features/dashboard/hooks/useReduxFilter";

const StyledFilterDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FilterModal = ({ closeModal }: { closeModal: () => void }) => {
  const { filterLocalState, handleFilterLocalState } = useLocalFilter();
  const { error: filterError, handleFilterReduxState } =
    useReduxFilter(filterLocalState);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleFilterReduxState(filterLocalState);
    closeModal();
  };

  return (
    <Modal title="Filter" submitButtonText="Done" onSubmit={handleSubmit}>
      <FilterTransaction
        transactionTypeLocalState={filterLocalState.transactionType}
        handleFilterLocalState={handleFilterLocalState}
      />
      <FilterCategory
        transactionTypeLocalState={filterLocalState.transactionType}
        categoryLocalState={filterLocalState.category}
        handleFilterLocalState={handleFilterLocalState}
      />
      <StyledFilterDate>
        <FilterYear
          yearLocalState={filterLocalState.year}
          handleFilterLocalState={handleFilterLocalState}
        />
        <FilterMonth
          monthLocalState={filterLocalState.month}
          handleFilterLocalState={handleFilterLocalState}
        />
      </StyledFilterDate>
    </Modal>
  );
};

export default FilterModal;
