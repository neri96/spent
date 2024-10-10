import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import AuthImage from "./AuthImage";
import AuthForm from "./AuthForm";
import Animated from "@components/ui/Animated";

import { useAppDispatch } from "@app/store";
import { setCredentials } from "../authSlice";

import {
  ILoginInput,
  IRegisterInput,
  useLoginMutation,
  useRegisterMutation,
} from "@app/services/auth";

import { AuthType } from "../ts/types";
import {
  defaultState,
  defaultFields,
  customStyles,
} from "@constants/authConst";

const StyledAuthContainer = styled.div`
  min-height: ${({ theme }) => theme.fiexPageHeight};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledAuth = styled.div`
  height: 400px;
  width: 500px;
  border-radius: ${({ theme }) => theme.borderRadius};
  position: relative;
  overflow: hidden;
`;

export const AuthContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState<AuthType>(AuthType.Login);

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const handleRequest = async (formData: ILoginInput | IRegisterInput) => {
    if (authMode === AuthType.Login) {
      const response = await login(formData).unwrap();

      dispatch(
        setCredentials({
          userId: response.userId,
          accessToken: response.accessToken,
        })
      );
    } else {
      const response = await register(formData as IRegisterInput).unwrap();

      dispatch(
        setCredentials({
          userId: response.userId,
          accessToken: response.accessToken,
        })
      );
    }

    navigate("/");
  };

  return (
    <StyledAuthContainer>
      <StyledAuth>
        {/* <AuthImage /> */}
        <Animated
          skipInitial
          isVisible={authMode === AuthType.Login}
          customStyles={customStyles}
        >
          <AuthForm
            authMode={AuthType.Login}
            initialState={defaultState}
            requiredFields={defaultFields}
            handleModeSwitch={() => setAuthMode(AuthType.Register)}
            handleRequest={handleRequest}
          />
        </Animated>
        <Animated
          isVisible={authMode === AuthType.Register}
          customStyles={customStyles}
        >
          <AuthForm
            authMode={AuthType.Register}
            initialState={{ ...defaultState, confirmPassword: "" }}
            requiredFields={[...defaultFields, "confirmPassword"]}
            handleModeSwitch={() => setAuthMode(AuthType.Login)}
            handleRequest={handleRequest}
          />
        </Animated>
      </StyledAuth>
    </StyledAuthContainer>
  );
};
