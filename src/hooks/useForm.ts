import {
  useState,
  ChangeEvent,
  FocusEvent,
  Dispatch,
  SetStateAction,
} from "react";

import { capitalize, isEmpty } from "@common/utils";

const numericFields = new Set(["amount", "investmentReturn"]);

const rules = {
  username: { min: 2, max: 15, type: "length" },
  password: { min: 6, max: 30, type: "length" },
  confirmPassword: { min: 6, max: 30, type: "length" },
  title: { min: 3, max: 150, type: "length" },
  description: { min: 3, max: 1500, type: "length" },
  amount: { min: 1, max: Infinity, type: "number" },
  investmentReturn: { min: 1, max: Infinity, type: "number" },
};

export interface IForm {
  errors: Record<string, string>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleFocus: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface IFormReturnProps<T> extends IForm {
  formData: T;
  setFormData: Dispatch<SetStateAction<T>>;
  errors: Record<string, string>;
  validate: () => boolean;
  handleSubmit: (submitFc: () => void) => void;
}

type FormData<T> = {
  [K in keyof T]: T[K];
};

const useForm = <T extends Record<string, any>>(
  initialState: T,
  requireqFields: string[]
): IFormReturnProps<T> => {
  const [formData, setFormData] = useState<FormData<T>>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (specifiedField?: string) => {
    let isValid = false;
    const errorsLocal: Record<string, string> = {};

    setErrors({});

    const checkField = (reqField: string) => {
      const current = formData[reqField];

      if (!current && requireqFields.includes(reqField)) {
        errorsLocal[reqField] = `${capitalize(reqField)} is required`;
        return;
      }

      const { type, min, max } = rules[reqField as keyof typeof rules] || {};

      if (type === "length" && typeof current === "string") {
        const valLength = current.trim().length;

        if (valLength < min || valLength > max) {
          errorsLocal[reqField] = `${capitalize(
            reqField
          )} must be between ${min} and ${max} characters long`;
        }
      } else if (type === "number" && current > 0) {
        if (current < min) {
          errorsLocal[reqField] = `${capitalize(
            reqField
          )} must be at least ${min}`;
        } else if (current > max) {
          errorsLocal[reqField] = `${capitalize(
            reqField
          )} can't be more that ${max}`;
        }
      }
    };

    specifiedField
      ? checkField(specifiedField)
      : requireqFields.forEach(checkField);

    if (isEmpty(errorsLocal)) {
      isValid = true;
    } else {
      setErrors((prev) => ({ ...prev, ...errorsLocal }));
    }

    return isValid;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value: currentValue } = e.target;

    if (numericFields.has(name) && !/^\d*\.?\d*$/.test(currentValue)) {
      return;
    }

    setFormData({ ...formData, [name]: currentValue });
  };

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrors((prevState) => ({ ...prevState, [e.target.name]: "" }));
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;

    if (requireqFields.includes(name)) validate(name);
  };

  const handleSubmit = (submitFc: () => void) => {
    const shouldPass = validate();

    if (!shouldPass) return;

    submitFc();
  };

  return {
    formData,
    setFormData,
    errors,
    validate,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
  };
};

export default useForm;
