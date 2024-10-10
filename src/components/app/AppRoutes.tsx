import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Header from "@components/layout/Header";
import Footer from "@components/layout/Footer";
import ProtectedPage from "@components/shared/ProtectedPage";
import Toast from "@components/ui/Toast";

import Auth from "@pages/Auth";
import Dashboard from "@pages/Dashboard";
import Analytics from "@pages/Analytics";

import GlobalStyles from "@common/globalStyles";

import { useTypedSelector } from "@app/store";

const RootLayout = () => {
  const isAuth = useTypedSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <GlobalStyles />
      <Header />
      <main>
        <Outlet />
      </main>
      <Toast />
      <Footer />
    </>
  );
};

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/auth",
          element: <Auth />,
        },
        {
          path: "/",
          element: (
            <ProtectedPage>
              <Dashboard />
            </ProtectedPage>
          ),
        },
        {
          path: "/analytics",
          element: (
            <ProtectedPage>
              <Analytics />
            </ProtectedPage>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
