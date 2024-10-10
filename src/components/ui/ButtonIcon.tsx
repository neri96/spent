import { ReactNode, CSSProperties } from "react";

import { useTheme, DefaultTheme } from "styled-components";

import Button from "./Button";

export enum ButtonBorder {
  Success,
  Danger,
  Neutral,
}

interface IButtonIconProps {
  handleClick: () => void;
  btnBorder?: ButtonBorder;
  children: ReactNode;
}

const getCustomStylesBtn = (
  theme: DefaultTheme,
  btnBorder?: ButtonBorder
): CSSProperties => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "transparent",
  border: `1px solid ${
    btnBorder === ButtonBorder.Success
      ? theme.success
      : btnBorder === ButtonBorder.Danger
      ? theme.danger
      : theme.neutral
  }`,
});

const ButtonIcon = ({ children, btnBorder, handleClick }: IButtonIconProps) => {
  const theme = useTheme();
  const customStylesBtn = getCustomStylesBtn(theme, btnBorder);

  return (
    <Button type="button" onClick={handleClick} customStyles={customStylesBtn}>
      {children}
    </Button>
  );
};

export default ButtonIcon;
