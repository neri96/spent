import { useRef, ReactNode, RefObject, CSSProperties } from "react";

import styled from "styled-components";

import Animated from "./Animated";

import useToggle from "@hooks/useToggle";
import useClickOutside from "@hooks/useClickOutside";

import { fieldWrapStyles, labelStyles, fieldStyles } from "@common/styles";

interface IDropdownProps {
  label: string;
  title?: string;
  children: ReactNode;
}

const StyledDropdown = styled.div`
  width: 100%;
  position: relative;
  ${fieldWrapStyles};
`;

const StyledDropdownTitle = styled.div`
  ${labelStyles};
`;

const StyledDropdownField = styled.div`
  ${fieldStyles};
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledDropdownList = styled.ul`
  max-height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.darkGray};
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: auto;
`;

const listStyles: CSSProperties = {
  height: "175px",
  width: "calc(100% - 20px)",
  position: "absolute",
  top: "calc(100% + 10px)",
  left: "50%",
  transform: "translateX(-50%) translateZ(0)",
  zIndex: 5,
};

const DropDown = ({ label, title, children }: IDropdownProps) => {
  const { isActive, toggle } = useToggle();

  const btnRef = useRef<HTMLDivElement>(null);
  const listBoxRef = useClickOutside(toggle, btnRef);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      toggle();
    }
  };

  return (
    <StyledDropdown>
      <StyledDropdownTitle>{label}</StyledDropdownTitle>
      <StyledDropdownField
        ref={btnRef}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={isActive}
        onClick={toggle}
        onKeyDown={handleKeyDown}
      >
        {title || "-"}
      </StyledDropdownField>
      <Animated key={label} isVisible={isActive} customStyles={listStyles}>
        <StyledDropdownList
          ref={listBoxRef as RefObject<HTMLUListElement>}
          role="listbox"
          aria-labelledby={label}
        >
          {children}
        </StyledDropdownList>
      </Animated>
    </StyledDropdown>
  );
};

export default DropDown;
