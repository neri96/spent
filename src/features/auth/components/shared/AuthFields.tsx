import Field from "@components/ui/Field";

import { IForm } from "@hooks/useForm";

interface IAuthFuildConfig {
  label: string;
  name: string;
  icon: string;
}

interface IAuthInput {
  username: string;
  password: string;
  confirmPassword?: string;
}

interface IAuthFieldsProps extends IForm {
  fields: IAuthFuildConfig[];
  formData: IAuthInput;
}

const AuthFields = ({
  fields,
  formData,
  errors,
  handleChange,
  handleFocus,
  handleBlur,
}: IAuthFieldsProps) => {
  return fields.map(({ label, name, icon }) => (
    <Field
      key={name}
      type={
        name === "password" || name === "confirmPassword" ? "password" : "text"
      }
      label={label}
      name={name}
      value={formData[name as keyof IAuthInput]}
      error={errors[name]}
      icon={icon}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  ));
};

export default AuthFields;
