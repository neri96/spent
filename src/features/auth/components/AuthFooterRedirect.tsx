import { CSSProperties } from "react";

import styled from "styled-components";

import ButtonIcon, { ButtonBorder } from "@components/ui/ButtonIcon";
import Icon from "@components/ui/Icon";

import INext from "@assets/icons/next.svg";

import { AuthType } from "@features/auth/ts/types";

interface AuthFooterRedirectProps {
  authMode: AuthType;
  handleModeSwitch: () => void;
}

const StyledAuthFooterRedirect = styled.div`
  margin: 10px 0 10px 15px;
`;

const iconCustomStyles: CSSProperties = {
  paddingLeft: "10px",
};

const AuthFooterRedirect = ({
  authMode,
  handleModeSwitch,
}: AuthFooterRedirectProps) => {
  const btnText = authMode === AuthType.Login ? "Register" : "Log in";
  const btnTitle =
    authMode === AuthType.Login
      ? "Proceed to register form"
      : "Proceed to log in form";

  return (
    <StyledAuthFooterRedirect>
      <ButtonIcon
        btnBorder={ButtonBorder.Success}
        handleClick={handleModeSwitch}
      >
        {btnText}
        <Icon src={INext} title={btnTitle} customStyles={iconCustomStyles} />
      </ButtonIcon>
    </StyledAuthFooterRedirect>
  );
};

export default AuthFooterRedirect;
