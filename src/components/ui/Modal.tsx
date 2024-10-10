import { ReactNode, FormHTMLAttributes, useId, ReactElement } from "react";

import styled, { css } from "styled-components";

import Button from "./Button";

import {
  positionCenter,
  customStylesMixin,
  dialogStyles,
} from "@common/styles";

import { ICustomStyles, ICustomStylesSC } from "@ts/interfaces";

interface IModalFooterProps {
  additionalButton?: ReactElement;
  additionalContent?: ReactElement;
}

interface IModalProps
  extends ICustomStyles,
    FormHTMLAttributes<HTMLFormElement> {
  title: string;
  includeHeader?: boolean;
  footerSettings?: IModalFooterProps;
  submitButtonText: string;
  isCentered?: boolean;
  children?: ReactNode;
}

interface IStyledModalProps extends ICustomStylesSC {
  $isCentered: boolean;
}

const titleFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledModal = styled.div<IStyledModalProps>`
  ${dialogStyles};
  ${({ $isCentered }) => $isCentered && positionCenter};
  ${customStylesMixin};
  cursor: default;
  z-index: 6;
`;

const StyledModalHeader = styled(titleFooter)`
  height: 60px;
`;

const StyledModalFooter = styled(titleFooter)<{ $additionalBtn?: boolean }>`
  min-height: 120px;
  ${({ $additionalBtn }) =>
    $additionalBtn &&
    css`
      button {
        margin: 0 5px;
      }
    `}
`;

const StyledForm = styled.form`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledModalBody = styled.div`
  width: 100%;
`;

const Modal = ({
  title,
  includeHeader = true,
  footerSettings,
  submitButtonText,
  isCentered = true,
  children,
  customStyles,
  ...props
}: IModalProps) => {
  const modalId = useId();

  return (
    <StyledModal
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-labelledby={`${modalId}-title`}
      aria-modal="true"
      $isCentered={isCentered}
      $customStyles={customStyles}
    >
      {includeHeader ? (
        <StyledModalHeader id={`${modalId}-title`}>{title}</StyledModalHeader>
      ) : null}
      <StyledForm {...props}>
        {children ? <StyledModalBody>{children}</StyledModalBody> : null}
        <StyledModalFooter
          $additionalBtn={Boolean(footerSettings?.additionalButton)}
        >
          {footerSettings?.additionalButton}
          <Button type="submit" ariaLabel={title}>
            {submitButtonText}
          </Button>
          {footerSettings?.additionalContent}
        </StyledModalFooter>
      </StyledForm>
    </StyledModal>
  );
};

export default Modal;
