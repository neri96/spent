import { CSSProperties } from "react";

export const defaultState = {
  username: "",
  password: "",
};

export const defaultFields = ["username", "password"];

export const customStyles: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  height: "100%",
  width: "100%",
};
