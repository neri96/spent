import styled from "styled-components";

import AnalyticsReport from "./AnalyticsReport";
import PieChart from "@components/shared/PieChart";

import * as colors from "@constants/colorConst";

import { IAnalytics } from "@app/services/analytics";
import { TransactionType } from "@ts/types";

import { blockStyles } from "@common/styles";

const StyledAnalyticsDetails = styled.div`
  width: calc(100% / 3);
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  box-sizing: border-box;
  @media (max-width: 1250px) {
    width: 100%;
  }
`;

const StyledChartHeader = styled.h2`
  margin-top: 20px;
  padding: 10px 20px;
  text-align: center;
  align-self: center;
  ${blockStyles}
`;

const StyledChart = styled.div`
  height: 370px;
  position: relative;
  @media (max-width: 550px) {
    height: 300px;
  }

  @media (max-width: 1250px) {
    height: 500px;
  }

  @media (min-width: 1600px) {
    height: 500px;
  }

  @media (min-width: 2000px) {
    height: 700px;
  }
`;

const colorRoles: Record<TransactionType, string[]> = {
  [TransactionType.Income]: colors.brightColors,
  [TransactionType.Expense]: colors.darkColors,
  [TransactionType.Investment]: colors.neutralColors,
};

const getColors = (length: number, transactionType: string): string[] => {
  const result = [];

  const colorList =
    colorRoles[transactionType as keyof typeof TransactionType].slice();

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * colorList.length);

    result.push(colorList[index]);
    colorList.splice(index, 1);
  }

  return result;
};

const AnalyticsDetails = ({ data }: { data: IAnalytics }) => {
  const { transactionType, categories } = data;
  const colors = getColors(categories.length, transactionType);

  const chartData = data.categories.map(({ category, totalAmount }, index) => {
    return {
      id: index + category,
      label: category,
      value: totalAmount,
      color: colors[index],
    };
  });

  return (
    <StyledAnalyticsDetails>
      <StyledChartHeader>{data.transactionType}</StyledChartHeader>
      <StyledChart>
        <PieChart data={chartData} />
        <AnalyticsReport data={chartData} />
      </StyledChart>
    </StyledAnalyticsDetails>
  );
};

export default AnalyticsDetails;
