import { CSSProperties } from "react";

export interface ITransactionData {
  id?: string;
  title: string;
  amount: number;
  transactionType?: string;
  category?: string;
  description?: string;
  investmentReturn?: number;
  date: Date | null;
}

export interface ICustomStyles {
  customStyles?: CSSProperties;
}

export interface ICustomStylesSC {
  $customStyles?: CSSProperties;
}
