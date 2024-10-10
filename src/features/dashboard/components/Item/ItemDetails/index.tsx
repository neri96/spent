import { forwardRef } from "react";

import ItemUpdate from "./ItemUpdate";
import ItemDelete from "./ItemDelete";

import { convertDate } from "@common/utils";

import * as S from "./styles";

import { TransactionType } from "@ts/types";
import { ITransactionData } from "@ts/interfaces";

interface ItemDetailsData {
  id: string;
  amount: number;
  transactionType: string;
  title: string;
  investmentReturn?: number;
  category: string;
  date: Date;
}

interface ItemDetailsProps {
  data: ITransactionData;
}

const ItemDetails = forwardRef<HTMLLIElement, ItemDetailsProps>(
  ({ data }, ref) => {
    const {
      id: transactionId,
      amount,
      transactionType: _trType,
      title,
      investmentReturn,
      category,
      date,
    } = data;
    const transactionType = _trType as TransactionType;

    const checkTransactionType = (type: keyof typeof TransactionType) =>
      transactionType === TransactionType[type];

    return (
      <S.ItemDetails ref={ref} $transactionType={transactionType}>
        <S.ItemData>
          <S.ItemDataElement $isTitle>
            <span>{title}</span>
            <h3>{title}</h3>
          </S.ItemDataElement>
          <S.ItemDataElement>
            <strong>{transactionType}</strong>
          </S.ItemDataElement>
          <S.ItemDataElement>
            {checkTransactionType("Expense")
              ? `-${amount}$`
              : checkTransactionType("Investment")
              ? `${amount}$ (${investmentReturn || 0}$)`
              : `${amount}$`}
          </S.ItemDataElement>
          <S.ItemDataElement $isFooterElement>{category}</S.ItemDataElement>
          <S.ItemDataElement $isFooterElement $isDate>
            {convertDate(date as Date)}
          </S.ItemDataElement>
          <S.ItemActions>
            <ItemUpdate transactionId={transactionId!} />
            <ItemDelete transactionId={transactionId!} />
          </S.ItemActions>
        </S.ItemData>
      </S.ItemDetails>
    );
  }
);

export default ItemDetails;
