import { Navigate } from "react-router-dom";

import PageLayout from "@components/layout/PageLayout";
import { AuthContainer } from "@features/auth";

import { useTypedSelector } from "@app/store";

const Auth = () => {
  const isAuth = useTypedSelector((state) => state.auth.isAuthenticated);

  return isAuth ? (
    <Navigate to="/" />
  ) : (
    <PageLayout title="Authorization">
      <AuthContainer />
    </PageLayout>
  );
};

export default Auth;
