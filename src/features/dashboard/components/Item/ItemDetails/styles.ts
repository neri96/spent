import styled, { css } from "styled-components";

import { TransactionType } from "@ts/types";
import { itemWrapperStyles, itemStyles } from "@common/styles";

export const ItemDetails = styled.li<{ $transactionType: TransactionType }>`
  height: 50px;
  flex: 1;
  text-transform: capitalize;
  background-color: ${({ theme }) => theme.softGray};
  margin-bottom: ${({ theme }) => theme.commonMargin};
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 15px;
    border-top-left-radius: ${({ theme }) => theme.borderRadius};
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius};

    background-color: ${({ theme, $transactionType }) =>
      $transactionType === TransactionType.Income
        ? theme.success
        : $transactionType === TransactionType.Expense
        ? theme.danger
        : $transactionType === TransactionType.Investment
        ? theme.neutral
        : "black"};
  }

  @media (max-width: 830px) {
    height: 150px;
  }
`;

export const ItemData = styled.div`
  height: 100%;
  ${itemWrapperStyles};

  @media (max-width: 830px) {
    display: block;
    padding-left: 15px;
    box-sizing: border-box;
    position: relative;
  }
`;

export const ItemDataElement = styled.div<{
  $isTitle?: boolean;
  $isFooterElement?: boolean;
  $isDate?: boolean;
}>`
  ${itemStyles};
  text-align: center;
  h3 {
    display: none;
  }

  @media (max-width: 830px) {
    padding-left: 10px;
    box-sizing: border-box;
    justify-content: flex-start;
    ${({ $isTitle }) =>
      $isTitle &&
      css`
        height: 40px;
        span {
          display: none;
        }
        h3 {
          display: block;
          margin: 0;
        }
      `};

    ${({ $isFooterElement, $isDate }) =>
      $isFooterElement &&
      css`
        width: 100px;
        position: absolute;
        left: ${$isDate ? "calc(100% - 100px)" : "15px"};
        bottom: 10px;
        font-size: 0.9rem;
        color: #ccc;
      `}
  }
`;

export const ItemActions = styled.div`
  height: 100%;
  width: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  box-sizing: border-box;
  @media (max-width: 830px) {
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
  }
`;
