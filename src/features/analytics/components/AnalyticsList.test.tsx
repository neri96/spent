import { render, screen, waitFor } from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import AnalyticsList from "./AnalyticsList";

jest.mock("@nivo/pie", () => ({
  ResponsivePie: () => null,
}));

const useGetAnalyticsQueryMocked = jest.fn();

jest.mock("@app/services/analytics", () => ({
  useGetAnalyticsQuery: () => useGetAnalyticsQueryMocked(),
}));

const theme = {
  colors: {
    textColor: "#fff",
  },
};

const renderWithTheme = (component: any) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Analytics component", () => {
  beforeEach(() => {
    useGetAnalyticsQueryMocked.mockClear();
  });

  test("renders loading", async () => {
    useGetAnalyticsQueryMocked.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });

    renderWithTheme(<AnalyticsList />);

    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  test("renders error", async () => {
    useGetAnalyticsQueryMocked.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });

    renderWithTheme(
      <BrowserRouter>
        <AnalyticsList />
      </BrowserRouter>
    );

    expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
  });

  test("renders data after a successful request", async () => {
    const mockData = [
      {
        id: 1,
        transactionType: "Income",
        categories: [{ category: "Salary", totalAmount: 10000 }],
      },
      {
        id: 2,
        transactionType: "Expense",
        categories: [{ category: "Rent", totalAmount: 1200 }],
      },
    ];

    useGetAnalyticsQueryMocked.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    });

    renderWithTheme(<AnalyticsList />);

    expect(screen.getByText(/income/i)).toBeInTheDocument();
    expect(screen.getByText(/expense/i)).toBeInTheDocument();
  });
});
