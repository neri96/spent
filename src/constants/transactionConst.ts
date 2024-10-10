import { ITransactionData } from "@ts/interfaces";
import { TransactionType, IncomeType } from "@ts/types";

export const initialTransactionState: ITransactionData = {
  title: "",
  transactionType: TransactionType.Income,
  category: IncomeType.Salary,
  amount: 0,
  description: "",
  investmentReturn: 0,
  date: null,
};
