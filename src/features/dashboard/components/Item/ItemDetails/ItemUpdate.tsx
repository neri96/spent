import { useEffect, FormEvent } from "react";

import {
  useGetOneTransactionQuery,
  useUpdateTransactionMutation,
} from "@app/services/transaction";

import Animated from "@components/ui/Animated";
import Backdrop from "@components/ui/Backdrop";
import Modal from "@components/ui/Modal";
import TransactionModal, {
  TransactionActionType,
} from "@components/shared/TransactionModal";
import Icon from "@components/ui/Icon";

import useToggle from "@hooks/useToggle";
import useForm from "@hooks/useForm";
import useToast from "@hooks/useToast";

import IcEdit from "@assets/icons/edit.svg";

import { initialTransactionState } from "@constants/transactionConst";

const ItemUpdateModal = ({
  transactionId,
  isOpen,
  toggle,
}: {
  transactionId: string;
  isOpen: boolean;
  toggle: () => void;
}) => {
  const { handleSuccess } = useToast();

  const { data } = useGetOneTransactionQuery(transactionId);
  const [updateTransaction] = useUpdateTransactionMutation();

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
    if (data) {
      setFormData((prevFromData) => ({
        ...prevFromData,
        ...data,
      }));
    }
  }, [data]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit(async () => {
      const { data: updateData } = await updateTransaction({
        id: transactionId,
        ...formData,
      });

      toggle();
      setFormData(initialTransactionState);

      updateData && handleSuccess(updateData);
    });
  };

  return (
    <Backdrop isOpen={isOpen} toggle={toggle}>
      <Modal
        title="Update Transaction"
        submitButtonText="Update"
        onSubmit={onSubmit}
      >
        <TransactionModal
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          handleChange={handleChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          transactionActionType={TransactionActionType.Update}
        />
      </Modal>
    </Backdrop>
  );
};

const ItemUpdate = ({ transactionId }: { transactionId: string }) => {
  const { isActive, toggle } = useToggle();

  return (
    <>
      <Icon src={IcEdit} title="Edit" isButton onClick={toggle} />

      <Animated isVisible={isActive}>
        <ItemUpdateModal
          transactionId={transactionId}
          isOpen={isActive}
          toggle={toggle}
        />
      </Animated>
    </>
  );
};

export default ItemUpdate;
