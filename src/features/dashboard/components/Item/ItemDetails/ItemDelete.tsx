import { CSSProperties, FormEvent } from "react";
import { useTheme } from "styled-components";

import { useDeleteTransactionMutation } from "@app/services/transaction";

import Backdrop from "@components/ui/Backdrop";
import Modal from "@components/ui/Modal";
import Button from "@components/ui/Button";
import Icon from "@components/ui/Icon";

import useToggle from "@hooks/useToggle";
import useToast from "@hooks/useToast";

import IcDelete from "@assets/icons/delete.svg";

const ItemDelete = ({ transactionId }: { transactionId: string }) => {
  const theme = useTheme();

  const { handleSuccess } = useToast();
  const { isActive, toggle } = useToggle();

  const [deleteTransaction] = useDeleteTransactionMutation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: deletedData } = await deleteTransaction(transactionId);

    toggle();
    deletedData && handleSuccess(deletedData);
  };

  return (
    <>
      <Icon src={IcDelete} title="delete" isButton onClick={toggle} />

      <Backdrop isOpen={isActive} toggle={toggle}>
        <Modal
          title="Do you want to delete the item?"
          submitButtonText="Yes"
          onSubmit={onSubmit}
          footerSettings={{
            additionalButton: (
              <Button
                type="button"
                onClick={toggle}
                customStyles={
                  {
                    backgroundColor: theme.neutral,
                  } as CSSProperties
                }
              >
                No
              </Button>
            ),
          }}
        />
      </Backdrop>
    </>
  );
};

export default ItemDelete;
