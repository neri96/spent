import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useTypedSelector } from "@app/store";

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const isAuth = useTypedSelector((state) => state.auth.isAuthenticated);

  return isAuth ? children : <Navigate to="/auth" />;
};

export default ProtectedPage;
