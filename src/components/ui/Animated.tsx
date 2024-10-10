import { ReactNode } from "react";

import styled from "styled-components";
import { motion, Variants, Transition, AnimatePresence } from "framer-motion";

import useFirstRender from "@hooks/useFirstRender";

import { ICustomStyles, ICustomStylesSC } from "@ts/interfaces";

interface IAnimatedProps extends ICustomStyles {
  animKey?: string;
  isVisible: boolean;
  skipInitial?: boolean;
  variants?: Variants;
  transition?: Transition;
  children: ReactNode;
}

const defaultAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const StyledAnimatedWrap = styled(motion.div)<ICustomStylesSC>`
  ${({ $customStyles }) => $customStyles && { ...$customStyles }}
`;

const Animated = ({
  animKey,
  isVisible,
  skipInitial = false,
  variants = defaultAnimation,
  transition,
  customStyles,
  children,
}: IAnimatedProps) => {
  const isFirstRender = useFirstRender();

  return (
    <AnimatePresence>
      {isVisible && (
        <StyledAnimatedWrap
          key={animKey}
          initial={skipInitial && isFirstRender ? false : "hidden"}
          animate={"visible"}
          exit={"exit"}
          variants={variants}
          transition={transition}
          layout
          $customStyles={customStyles}
        >
          {children}
        </StyledAnimatedWrap>
      )}
    </AnimatePresence>
  );
};

export default Animated;
