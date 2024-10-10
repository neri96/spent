import { renderHook } from "@testing-library/react";
import useInfiniteScroll from "./useInfiniteScroll";

beforeAll(() => {
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: jest.fn(),
    disconnect: jest.fn(),
  });
  (window as any).IntersectionObserver = mockIntersectionObserver;
});

describe("useInfiniteScroll", () => {
  it("should trigger flipPage when the element is in view and hasNextPage is true", () => {
    const flipPage = jest.fn();

    const { rerender } = renderHook(() =>
      useInfiniteScroll({
        isFetching: false,
        hasNextPage: true,
        flipPage,
      })
    );

    const entries = [{ isIntersecting: true }];
    (window as any).IntersectionObserver.mock.calls[0][0](entries);

    rerender();

    expect(flipPage).toHaveBeenCalledTimes(1);
  });

  it("should not trigger flipPage when isFetching is true", () => {
    const flipPage = jest.fn();

    renderHook(() =>
      useInfiniteScroll({
        isFetching: true,
        hasNextPage: true,
        flipPage,
      })
    );

    const entries = [{ isIntersecting: true }];
    (window as any).IntersectionObserver.mock.calls[0][0](entries);

    expect(flipPage).not.toHaveBeenCalled();
  });

  it("should not trigger flipPage when hasNextPage is false", () => {
    const flipPage = jest.fn();

    renderHook(() =>
      useInfiniteScroll({
        isFetching: false,
        hasNextPage: false,
        flipPage,
      })
    );

    const entries = [{ isIntersecting: true }];
    (window as any).IntersectionObserver.mock.calls[0][0](entries);

    expect(flipPage).not.toHaveBeenCalled();
  });
});
