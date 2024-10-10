import { useState, useEffect } from "react";

const useResize = (width: number, defaultValue?: boolean): boolean => {
  const [isValid, setIsValid] = useState<boolean>(defaultValue || false);

  const handleResize = () => {
    setIsValid(window.innerWidth >= width);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isValid;
};

export default useResize;
