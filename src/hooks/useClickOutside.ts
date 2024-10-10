import { useRef, useEffect, RefObject } from "react";

const useClickOutside = (cb: () => void, buttonElement?: RefObject<any>) => {
  const ref = useRef<HTMLDivElement | HTMLUListElement>(null);

  const handleClick = (e: MouseEvent | TouchEvent) => {
    if (
      ref.current &&
      !ref.current.contains(e.target as HTMLElement) &&
      buttonElement &&
      !buttonElement.current.contains(e.target as HTMLElement)
    ) {
      cb();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);

  return ref;
};

export default useClickOutside;
