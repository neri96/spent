import { ReactNode } from "react";

import styled from "styled-components";

const StyledError = styled.div`
  color: ${({ theme }) => theme.danger};
  margin-bottom: 3px;
`;

const Error = ({
  errorId,
  children,
}: {
  errorId: string;
  children: ReactNode;
}) => {
  return (
    <StyledError id={errorId} role="alert">
      {children}
    </StyledError>
  );
};

export default Error;
