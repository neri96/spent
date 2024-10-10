import ReactDOM from "react-dom";
import { ReactNode, useEffect } from "react";

import styled from "styled-components";

import { AnimatePresence, motion } from "framer-motion";

interface IBackdrop {
  isOpen: boolean;
  toggle?: () => void;
  children: ReactNode;
}

const StyledBackdrop = styled(motion.div)`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  cursor: pointer;
`;

const Backdrop = ({ children, isOpen, toggle }: IBackdrop) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        toggle && toggle();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, toggle]);

  const rootElement = document.querySelector("#backdrop");

  return rootElement
    ? ReactDOM.createPortal(
        <AnimatePresence>
          {isOpen && (
            <StyledBackdrop
              onClick={toggle}
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {children}
            </StyledBackdrop>
          )}
        </AnimatePresence>,
        rootElement
      )
    : null;
};

export default Backdrop;
