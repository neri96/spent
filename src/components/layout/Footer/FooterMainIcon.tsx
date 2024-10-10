import { Link } from "react-router-dom";
import styled from "styled-components";

import Icon from "@components/ui/Icon";

import IcMain from "@assets/icons/main-icon.svg";

const StyledHeaderMainIcon = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  img {
    filter: grayscale(90%);
  }
`;

const FooterMainIcon = () => {
  return (
    <Link to="/" aria-label="Home Page">
      <StyledHeaderMainIcon>
        <Icon
          src={IcMain}
          title="Home"
          customStyles={{ height: "50px", width: "50px" }}
        />
      </StyledHeaderMainIcon>
    </Link>
  );
};

export default FooterMainIcon;
