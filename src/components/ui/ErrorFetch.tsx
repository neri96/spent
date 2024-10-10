import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import Button from "./Button";

const StyledErrorFetch = styled.div`
  height: 90px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    font-size: 1.2rem;
  }
`;

const StyledRedirectBtn = styled.div`
  display: flex;
  justify-content: center;
`;

const ErrorFetch = ({ message }: { message: string }) => {
  const navigate = useNavigate();

  const handleRedirect = () => navigate("/");

  useEffect(() => {
    const timeout = setTimeout(() => handleRedirect(), 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledErrorFetch>
      <p>
        <strong>{message}</strong>
      </p>

      <StyledRedirectBtn>
        <Button onClick={handleRedirect}>Go to Dashborad</Button>
      </StyledRedirectBtn>
    </StyledErrorFetch>
  );
};

export default ErrorFetch;
