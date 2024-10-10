import styled from "styled-components";

import Button from "./Button";

import { customStylesMixin } from "@common/styles";

import { ICustomStyles, ICustomStylesSC } from "@ts/interfaces";

interface IconProps extends ICustomStyles {
  src: string;
  title: string;
  isButton?: boolean;
  onClick?: () => void;
}

const StyledIcon = styled.img<ICustomStylesSC>`
  height: 25px;
  width: 25px;
  z-index: 2;
  ${customStylesMixin};
`;

const Icon = ({
  src,
  title,
  isButton = false,
  customStyles,
  onClick,
}: IconProps) => {
  return isButton ? (
    <Button onClick={onClick} isStyled={false} ariaLabel={title}>
      <StyledIcon src={src} alt={title} $customStyles={customStyles} />
    </Button>
  ) : (
    <StyledIcon
      src={src}
      alt={title}
      onClick={onClick}
      $customStyles={customStyles}
    />
  );
};

export default Icon;
