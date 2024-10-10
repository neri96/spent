import { ReactNode } from "react";
import { useTypedSelector } from "@app/store";

interface IProtectedContentProps {
  authContent: ReactNode;
  unauthContent?: ReactNode;
}

const ProtectedContent = ({
  authContent,
  unauthContent,
}: IProtectedContentProps) => {
  const isAuth = useTypedSelector((state) => state.auth.isAuthenticated);

  return isAuth ? authContent : unauthContent;
};

export default ProtectedContent;
