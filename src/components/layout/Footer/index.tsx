import styled from "styled-components";

import FooterMainIcon from "./FooterMainIcon";

const StyledFooter = styled.footer`
  height: 70px;
  background-color: ${({ theme }) => theme.deepBlue};
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  justify-content: center;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterMainIcon />
    </StyledFooter>
  );
};

export default Footer;
