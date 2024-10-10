import { CSSProperties } from "react";

import { css } from "styled-components";

export const blockStyles = css`
  background-color: ${({ theme }) => theme.popup};
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const fieldWrapStyles = css`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  box-sizing: border-box;
  margin-bottom: 5px;
`;

export const labelStyles = css`
  margin-bottom: 3px;
  color: #f0f0f0;
`;

export const fieldStyles = css`
  height: 35px;
  color: #f0f0f0;
  background-color: ${({ theme }) => theme.inputBg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.neutral};
  outline: none;
  padding: 0 5px;
  box-sizing: border-box;
`;

export const transparentButton = css`
  display: "flex";
  align-items: "center";
  margin-left: "15px";
  background-color: "transparent";
`;

export const transparentButtonObj = {
  display: "flex",
  alignItems: "center",
  marginLeft: "15px",
  backgroundColor: "transparent",
};

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const positionCenter = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const customStylesMixin = css<{ $customStyles?: CSSProperties }>`
  ${({ $customStyles }) => $customStyles && css({ ...$customStyles })}
`;

export const itemWrapperStyles = css`
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
`;

export const itemStyles = css`
  flex: 1;
  text-transform: capitalize;
  ${flexCenter};
`;

export const dialogStyles = css`
  width: 400px;
  display: flex;
  flex-direction: column;
  color: #f0f0f0;
  border: none;
  background-color: ${({ theme }) => theme.softGray};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius};
  @media (max-width: 500px) {
    width: 300px;
  }
`;
