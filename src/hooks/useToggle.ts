import { useState, Dispatch, SetStateAction } from "react";

const useToggle = (): {
  isActive: boolean;
  toggle: () => void;
  setIsActive: Dispatch<SetStateAction<boolean>>;
} => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggle = () => setIsActive((prev) => !prev);

  return { isActive, setIsActive, toggle };
};

export default useToggle;
