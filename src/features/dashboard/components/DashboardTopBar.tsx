import styled from "styled-components";

import Search from "./Search";
import Sort from "./Sort";
import Filter from "./Filter";

const StyledDashboardTopBar = styled.div`
  display: flex;
  margin-bottom: ${({ theme }) => theme.commonMargin};
`;

const DashboardTopBar = () => {
  return (
    <StyledDashboardTopBar>
      <Search />
      {/* <Sort /> to be implemented later */}
      <Filter />
    </StyledDashboardTopBar>
  );
};

export default DashboardTopBar;
