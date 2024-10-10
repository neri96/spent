import styled from "styled-components";

import DashboardTopBar from "./DashboardTopBar";
import ItemList from "./Item";

const StyledDashboardContainer = styled.div`
  max-height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => theme.commonMargin};
`;

export const DashboardContainer = () => {
  return (
    <StyledDashboardContainer>
      <DashboardTopBar />
      <ItemList />
    </StyledDashboardContainer>
  );
};
