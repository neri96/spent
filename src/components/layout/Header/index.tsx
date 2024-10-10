import styled from "styled-components";

import HeaderMainIcon from "./HeaderMainIcon";
import HeaderUserData from "./HeaderUserData";
import HeaderNav from "./HeaderNav";
import HeaderActions from "./HeaderActions";
import ProtectedContent from "@components/shared/ProtectedContent";

const StyledHeader = styled.header`
  height: 70px;
  background-color: ${({ theme }) => theme.deepBlue};
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  justify-content: space-between;
`;

const StyledHeaderRight = styled.div`
  display: flex;
`;

const Header = () => {
  return (
    <StyledHeader>
      <HeaderMainIcon />
      <StyledHeaderRight>
        <ProtectedContent authContent={<HeaderUserData />} />
        <ProtectedContent authContent={<HeaderNav />} />
        <ProtectedContent authContent={<HeaderActions />} />
      </StyledHeaderRight>
    </StyledHeader>
  );
};

export default Header;
