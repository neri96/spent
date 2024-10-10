import { useState, useEffect, useRef } from "react";

const useDebounce = (value: string, delay: number) => {
  const isFirstChange = useRef(true);

  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    if (isFirstChange.current) {
      setDebouncedValue(value);
      isFirstChange.current = false;
    } else {
      const timeout = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
