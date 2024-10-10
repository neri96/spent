import styled from "styled-components";

import { useMeQuery } from "@app/services/auth";
import { useTypedSelector } from "@app/store";

import { selectFilter } from "@features/dashboard/slices/filterSlice";

import HeaderData from "../HeaderData";
import HeaderBudget from "./HeaderBudget";
import Tooltip from "@components/ui/Tooltip";
import Icon from "@components/ui/Icon";

import IcMoney from "@assets/icons/budget.svg";
import IcStar from "@assets/icons/star.svg";
import IcUserData from "@assets/icons/userdata.svg";

const StyledHeaderUserIconText = styled.span<{ $isNegative: boolean }>`
  margin-left: 5px;
  color: ${({ theme, $isNegative }) =>
    $isNegative ? theme.danger : theme.green};
`;

const HeaderUserData = () => {
  const filterOptions = useTypedSelector(selectFilter);

  const { data } = useMeQuery(filterOptions.date);

  if (!data) return null;

  const { username, balance, points, budget, expenses } = data;

  return (
    <HeaderData
      headerDataBtn={{ src: IcUserData, title: "User data and stats" }}
      isPopup
    >
      <strong>{username}</strong>
      <Tooltip
        text="Points"
        description="By the month's end, the score may rise or fall, contingent on whether the balance is positive or negative"
      >
        <Icon src={IcStar} title="Points" isButton />
        <StyledHeaderUserIconText $isNegative={!points}>
          {points}
        </StyledHeaderUserIconText>
      </Tooltip>
      {balance ? (
        <>
          <Icon src={IcMoney} title="Balance" isButton />
          <StyledHeaderUserIconText $isNegative={!balance}>
            {balance}$
          </StyledHeaderUserIconText>
        </>
      ) : null}
      <HeaderBudget budget={budget} expenses={expenses} />
    </HeaderData>
  );
};

export default HeaderUserData;
