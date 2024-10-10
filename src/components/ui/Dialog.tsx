import { ReactNode } from "react";

import styled from "styled-components";

import Button from "./Button";

import { dialogStyles, flexCenter, positionCenter } from "@common/styles";

const StyledDialog = styled.dialog`
  ${dialogStyles};
  ${positionCenter};
  cursor: default;
  z-index: 6;
`;

const StyledDialogBody = styled.div`
  padding: 10px 0 0 10px;
`;

const StyledDialogFooter = styled.div`
  height: 80px;
  ${flexCenter};
`;

const Dialog = ({
  children,
  toggle,
}: {
  children: ReactNode;
  toggle: () => void;
}) => {
  return (
    <StyledDialog
      role="dialog"
      aria-describedby="dialog-body"
      onClick={(e) => e.stopPropagation()}
    >
      <StyledDialogBody id="dialog-body">{children}</StyledDialogBody>
      <StyledDialogFooter>
        <Button onClick={toggle}>Acknowledged</Button>
      </StyledDialogFooter>
    </StyledDialog>
  );
};

export default Dialog;
