import { ReactNode } from "react";

import styled from "styled-components";

import Animated from "./Animated";
import Icon from "./Icon";

import useToggle from "@hooks/useToggle";

import IcQuestion from "@assets/icons/question.svg";

import { ICustomStyles, ICustomStylesSC } from "@ts/interfaces";

import { blockStyles } from "@common/styles";

export enum TooltipPosition {
  Left,
  Center,
  Right,
}

interface ITooltipProps extends ICustomStyles {
  text: string;
  description?: string;
  position?: TooltipPosition;
  children: ReactNode;
}

const StyledTooltip = styled.div<ICustomStylesSC>`
  position: relative;
  z-index: 4;
  ${({ $customStyles }) => $customStyles && { ...$customStyles }}
`;

const StyledTooltipContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledTooltipTextWrapper = styled.div`
  padding-top: 10px;
  box-sizing: border-box;
  min-width: 150px;
  display: flex;
  flex-direction: column;
`;

const StyledTooltipTextContainer = styled.div`
  padding: 0 10px;
  min-height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  ${blockStyles}
`;

const StyledTooltipText = styled.div<{ $isDescr: boolean }>`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${({ $isDescr }) => ($isDescr ? `space-between` : `center`)};
  white-space: nowrap;
`;

const StyledTooltipDescrIcon = styled.div``;

const StyledTooltipDescrText = styled.div`
  background-color: ${({ theme }) => theme.darkBg};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  min-width: 100%;
  padding: 0 10px;
  padding-bottom: 10px;
  box-shadow: ${({ theme }) => theme.boxShadow};

  p {
    margin: 0;
    font-size: 0.9rem;
  }
`;

const Tooltip = ({
  text,
  description,
  position = TooltipPosition.Center,
  customStyles,
  children,
}: ITooltipProps) => {
  const horizontalPosition =
    position === TooltipPosition.Left
      ? { right: "0" }
      : position === TooltipPosition.Right
      ? { left: "0" }
      : { left: "50%", transform: "translateX(-50%)" };

  const { isActive: isVisible, setIsActive: setIsVisible } = useToggle();
  const { isActive: isDescrOpen, toggle: toggleDescr } = useToggle();

  return (
    <StyledTooltip
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      $customStyles={customStyles}
    >
      <StyledTooltipContent>{children}</StyledTooltipContent>
      <Animated
        isVisible={isVisible}
        customStyles={{
          position: "absolute",
          top: "27px",
          ...horizontalPosition,
        }}
      >
        <StyledTooltipTextWrapper>
          <StyledTooltipTextContainer>
            <StyledTooltipText $isDescr={Boolean(description)}>
              {text}
              {description ? (
                <StyledTooltipDescrIcon>
                  <Icon
                    src={IcQuestion}
                    title={`Description of ${text}`}
                    customStyles={{ height: "20px" }}
                    isButton
                    onClick={toggleDescr}
                    aria-controls="tooltip-description"
                    aria-expanded={isDescrOpen}
                  />
                </StyledTooltipDescrIcon>
              ) : null}
            </StyledTooltipText>
          </StyledTooltipTextContainer>

          <Animated isVisible={isDescrOpen}>
            <StyledTooltipDescrText id="tooltip-description">
              <p>{description}</p>
            </StyledTooltipDescrText>
          </Animated>
        </StyledTooltipTextWrapper>
      </Animated>
    </StyledTooltip>
  );
};

export default Tooltip;
