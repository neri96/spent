import { Dispatch, SetStateAction } from "react";

import Field, { FieldType } from "@components/ui/Field";
import Select from "@components/ui/Select";

import { IForm } from "@hooks/useForm";
import { ITransactionData } from "@ts/interfaces";
import {
  ExpenseType,
  IncomeType,
  InvestmentType,
  TransactionType,
} from "@ts/types";

export enum TransactionActionType {
  Create,
  Update,
}

interface ITransactionDataProps extends IForm {
  formData: ITransactionData;
  setFormData: Dispatch<SetStateAction<ITransactionData>>;
  transactionActionType?: TransactionActionType;
}

const TransactionModal = ({
  formData,
  setFormData,
  errors,
  handleChange,
  handleFocus,
  handleBlur,
  transactionActionType = TransactionActionType.Create,
}: ITransactionDataProps) => {
  const {
    title,
    transactionType,
    category,
    amount,
    investmentReturn,
    description,
    date,
  } = formData;

  const CategoryType =
    transactionType === TransactionType.Income
      ? IncomeType
      : transactionType === TransactionType.Expense
      ? ExpenseType
      : InvestmentType;

  return (
    <>
      <Field
        label="Title"
        name="title"
        value={title}
        error={errors.title}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />

      <Select
        label="Transaction Type"
        name="transactionType"
        value={transactionType}
        disabled={transactionActionType !== TransactionActionType.Create}
        list={Object.values(TransactionType)}
        onChange={handleChange}
      />
      <Select
        label="Category"
        name="category"
        value={category}
        disabled={transactionActionType !== TransactionActionType.Create}
        list={Object.values(CategoryType)}
        onChange={handleChange}
      />

      <Field
        label="Amount ($)"
        type="text"
        name="amount"
        min="0"
        value={amount}
        error={errors.amount}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {transactionType === TransactionType.Investment ? (
        <Field
          label="Investment Return"
          type="text"
          min="0"
          name="investmentReturn"
          value={investmentReturn}
          error={errors.investmentReturn}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : null}
      <Field
        label="Date"
        name="date"
        fieldType={FieldType.DatePicker}
        selectedDate={date as Date}
        error={errors.date}
        onDateChange={(date: Date | null) =>
          setFormData((prevFormDate) => ({ ...prevFormDate, date }))
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
      />
      <Field
        label="Description"
        name="description"
        fieldType={FieldType.Textarea}
        value={description}
        error={errors.description}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </>
  );
};

export default TransactionModal;
