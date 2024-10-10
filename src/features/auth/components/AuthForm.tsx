import { FormEvent } from "react";

import AuthFields from "./shared/AuthFields";
import AuthFooterRedirect from "./AuthFooterRedirect";
import Modal from "@components/ui/Modal";

import useForm from "@hooks/useForm";

import IcUser from "@assets/icons/user.svg";
import IcPassword from "@assets/icons/password.svg";

import { ILoginInput, IRegisterInput } from "@app/services/auth";
import { AuthType } from "../ts/types";

type AuthInput = ILoginInput | IRegisterInput;

interface IAuthProps {
  authMode: AuthType;
  initialState: AuthInput;
  requiredFields: string[];
  handleModeSwitch: () => void;
  handleRequest: (formData: AuthInput) => void;
}

const AuthForm = ({
  authMode,
  initialState,
  requiredFields,
  handleModeSwitch,
  handleRequest,
}: IAuthProps) => {
  const {
    formData,
    errors,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  } = useForm(initialState, requiredFields);

  const fields = [
    { label: "Username", name: "username", icon: IcUser },
    { label: "Password", name: "password", icon: IcPassword },
    ...(authMode === AuthType.Register
      ? [
          {
            label: "Confirm Password",
            name: "confirmPassword",
            icon: IcPassword,
          },
        ]
      : []),
  ];

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSubmit(() => handleRequest(formData));
  };

  const isRegister = authMode === AuthType.Register;

  return (
    <Modal
      title={isRegister ? "Register" : "Login"}
      submitButtonText={isRegister ? "Register" : "Login"}
      footerSettings={{
        additionalContent: (
          <AuthFooterRedirect
            authMode={authMode}
            handleModeSwitch={handleModeSwitch}
          />
        ),
      }}
      isCentered={false}
      customStyles={{
        height: "100%",
        width: "100%",
      }}
      onSubmit={onSubmit}
    >
      <AuthFields
        fields={fields}
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />
    </Modal>
  );
};

export default AuthForm;
