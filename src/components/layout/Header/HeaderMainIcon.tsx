import { Link } from "react-router-dom";
import styled from "styled-components";

import Icon from "@components/ui/Icon";

import IcMain from "@assets/icons/main-icon.svg";

const StyledLink = styled(Link)`
  display: flex;
`;

const StyledHeaderMainIcon = styled.div`
  height: 100%;
  margin: 0 10px;
`;

const StyledHeaderMainTitle = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-family: "Playwrite DE Grund", cursive;
    font-optical-sizing: auto;
    font-style: normal;
    text-transform: uppercase;
    margin: 0;
  }
`;

const HeaderMainIcon = () => {
  return (
    <StyledLink to="/" aria-label="Home Page">
      <StyledHeaderMainIcon>
        <Icon
          src={IcMain}
          title="Home"
          customStyles={{ height: "60px", width: "60px" }}
        />
      </StyledHeaderMainIcon>
      <StyledHeaderMainTitle>
        <h1>spent</h1>
      </StyledHeaderMainTitle>
    </StyledLink>
  );
};

export default HeaderMainIcon;
