import { ReactNode, ButtonHTMLAttributes } from "react";

import styled from "styled-components";

import { customStylesMixin } from "@common/styles";

import { ICustomStyles, ICustomStylesSC } from "@ts/interfaces";

interface IButtonProps
  extends ICustomStyles,
    ButtonHTMLAttributes<HTMLButtonElement> {
  isFullSize?: boolean;
  ariaLabel?: string;
  isStyled?: boolean;
  color?: string;
  children: ReactNode;
}

interface IStyledButtonProps extends ICustomStylesSC {
  $isStyled: boolean;
}

const StyledButton = styled.button<IStyledButtonProps>`
  border: none;
  outline: none;
  cursor: pointer;
  color: ${({ theme }) => theme.textColor};
  ${(props) =>
    props.$isStyled
      ? `
        height: 35px;
        min-width: 50px;
        padding: 0 10px;
        box-shadow: ${props.theme.boxShadow};
        border-radius: 5px;
        color: ${props.theme.textColor};
        background-color: ${props.theme.success};
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        font-size: 0.9rem;
      `
      : `
        background: none;
        display: flex;
        align-items: center;
      `};
  ${customStylesMixin};
`;

const Button = ({
  children,
  isStyled = true,
  ariaLabel,
  customStyles,
  ...props
}: IButtonProps) => {
  return (
    <StyledButton
      aria-label={ariaLabel}
      $isStyled={isStyled}
      $customStyles={customStyles}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
