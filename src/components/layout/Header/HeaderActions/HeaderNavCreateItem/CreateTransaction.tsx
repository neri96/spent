import { useEffect, FormEvent } from "react";

import Backdrop from "@components/ui/Backdrop";
import Modal from "@components/ui/Modal";
import TransactionModal, {
  TransactionActionType,
} from "@components/shared/TransactionModal";

import { useCreateTransactionMutation } from "@app/services/transaction";

import useForm from "@hooks/useForm";
import useToast from "@hooks/useToast";

import { initialTransactionState } from "@constants/transactionConst";
import {
  ExpenseType,
  IncomeType,
  InvestmentType,
  TransactionType,
} from "@ts/types";

export interface ICreateTransactionProps {
  isOpen: boolean;
  toggle: () => void;
}

const getDefaultCategory = (transactionType: TransactionType): string => {
  const categoryMap: Record<TransactionType, Record<string, string>> = {
    [TransactionType.Income]: IncomeType,
    [TransactionType.Expense]: ExpenseType,
    [TransactionType.Investment]: InvestmentType,
  };

  return Object.keys(categoryMap[transactionType])[0];
};

const CreateTransaction = ({ isOpen, toggle }: ICreateTransactionProps) => {
  const { handleSuccess } = useToast();

  const {
    formData,
    setFormData,
    errors,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  } = useForm(initialTransactionState, ["title", "amount"]);

  useEffect(() => {
    const defaultCategory = getDefaultCategory(
      formData.transactionType as TransactionType
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      category: defaultCategory,
    }));
  }, [formData.transactionType, setFormData]);

  const [createTransaction] = useCreateTransactionMutation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit(async () => {
      const { data } = await createTransaction(formData);

      toggle();
      setFormData(initialTransactionState);

      data && handleSuccess(data);
    });
  };

  return (
    <Backdrop isOpen={isOpen} toggle={toggle}>
      <Modal
        title="Create Transaction"
        submitButtonText="Create"
        onSubmit={onSubmit}
      >
        <TransactionModal
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          handleChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          transactionActionType={TransactionActionType.Create}
        />
      </Modal>
    </Backdrop>
  );
};

export default CreateTransaction;
