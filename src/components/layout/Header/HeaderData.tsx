import { ReactNode, Children, isValidElement } from "react";
import { AnimatePresence, motion } from "framer-motion";

import styled, { css } from "styled-components";

import Icon from "@components/ui/Icon";

import useToggle from "@hooks/useToggle";
import useResize from "@hooks/useResize";

import { blockStyles } from "@common/styles";

export enum HeaderItemType {
  Regular,
  ExpandBtn,
  Expandable,
}

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const itemStyle = css`
  display: flex;
  align-items: center;
  margin: 0 7.5px;
`;

const StyledHeaderData = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  transition: 300ms;
`;

const StyledHeaderDataList = styled.ul<{ $isPopup: boolean }>`
  display: flex;
  flex-direction: ${({ $isPopup }) => ($isPopup ? "column" : "row")};
  z-index: 5;
  @media (max-width: 830px) {
    ${({ $isPopup }) =>
      $isPopup &&
      css`
        padding: 10px;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        ${blockStyles}
        li {
          margin: 5px 0;
        }
      `}
  }
`;

const StyledHeaderDataItem = styled.li`
  ${itemStyle}
`;

const StyledHeaderDataBtn = styled.div`
  ${itemStyle}
`;

const HeaderData = ({
  children,
  headerDataBtn,
  isPopup = false,
  isNav = false,
}: {
  children: ReactNode;
  headerDataBtn: { src: string; title: string };
  isPopup?: boolean;
  isNav?: boolean;
}) => {
  const { isActive, toggle } = useToggle();
  const isDesktopWidth = useResize(830);

  const content = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return (
        <StyledHeaderDataItem as={motion.li} variants={itemVariants}>
          {child}
        </StyledHeaderDataItem>
      );
    }
    return child;
  });

  return (
    <StyledHeaderData as={isNav ? "nav" : "div"}>
      <AnimatePresence>
        {(isActive || isDesktopWidth) && (
          <StyledHeaderDataList
            as={motion.ul}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={containerVariants}
            $isPopup={isPopup && !isDesktopWidth}
          >
            {content}
          </StyledHeaderDataList>
        )}
      </AnimatePresence>
      {!isDesktopWidth ? (
        <StyledHeaderDataBtn>
          <Icon
            src={headerDataBtn.src}
            title={headerDataBtn.title}
            isButton
            onClick={toggle}
          />
        </StyledHeaderDataBtn>
      ) : null}
    </StyledHeaderData>
  );
};

export default HeaderData;
