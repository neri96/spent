import { ReactNode } from "react";

import { ErrorBoundary } from "react-error-boundary";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import ErrorFallback from "@components/shared/ErrorFallback";

import { store } from "@app/store";
import initializeAuth from "@app/initializeAuth";

import { theme } from "@common/theme";

initializeAuth();

const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Andika:ital,wght@0,400;0,700;1,400;1,700&family=Playwrite+DE+Grund:wght@100..400&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <Provider store={store}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default AppProvider;
