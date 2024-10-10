import FilterDropDown from "./FilterDropDown";

import { IFilterStateProps } from "@features/dashboard/ts/interfaces";
import { FilterActionType } from "@features/dashboard/ts/types";
import { FilterAllOrArray, TransactionType } from "@ts/types";

interface IFilterTransactionProps extends IFilterStateProps {
  transactionTypeLocalState: FilterAllOrArray;
}

const FilterTransaction = ({
  transactionTypeLocalState,
  handleFilterLocalState,
}: IFilterTransactionProps) => {
  const options = Object.values(TransactionType);

  const setTransactionTypeLocalState = handleFilterLocalState(
    FilterActionType.SET_TRANSACTION_TYPE
  );

  return (
    <FilterDropDown
      label="Transaction Type"
      data={transactionTypeLocalState}
      setData={setTransactionTypeLocalState}
      options={options}
    />
  );
};

export default FilterTransaction;
