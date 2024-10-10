import { useEffect, useRef } from "react";

interface InfiniteScroll {
  isFetching: boolean;
  hasNextPage: boolean;
  flipPage: () => void;
}

const useInfiniteScroll = ({
  isFetching,
  hasNextPage,
  flipPage,
}: InfiniteScroll) => {
  const lastItemRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          flipPage();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isFetching, hasNextPage]);

  return lastItemRef;
};

export default useInfiniteScroll;
