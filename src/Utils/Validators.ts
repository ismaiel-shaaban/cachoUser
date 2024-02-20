//@ts-ignore
import { PhoneNumberUtil } from "google-libphonenumber";
import { fetcher } from "./Helpers";
import { strings } from "./Localization";

export const getEmailValidationRules = (
  requiredMessage: string = "Email is required",
  invalidMessage: string = "Email is invalid"
) => {
  return {
    validate: (value: string) => (value.trim() ? true : requiredMessage),
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: invalidMessage,
    },
  };
};

export const getSignupEmailValidationRules = (
  requiredMessage: string = "Email is required",
  invalidMessage: string = "Email is invalid",
  alreadyExists: string = "Email already exists"
) => {
  return {
    validate: async (value: string) => {
      if (value.trim()) {
        // api hit
        try {
          const data = await fetcher({
            url: "/api/v1/web/auth/check-email",
            method: "POST",
            data: {
              email: value,
            },
          });
          if (data?.status === 200) {
            return true;
          }
        } catch (error: any) {
          if (error?.response?.data?.status === 409) {
            return alreadyExists;
          }
        }
      } else {
        return requiredMessage;
      }
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: invalidMessage,
    },
  };
};

export const getPasswordValidationRules = (
  requiredMessage: string = "Password is required",
  invalidMessage: string = " Password should contain at least one uppercase, lowercase, digit,symbol and minimum of 6 characters"
) => {
  return {
    validate: (value: string) => (value.trim() ? true : requiredMessage),
    pattern: {
      value: /^(?=.*?[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])(?=.*?[0-9]).{6,}$/,
      message: invalidMessage,
    },
  };
};

export const getConfirmValidationRules = (password: string) => {
  return {
    validate: (value: string) =>
      value.trim()
        ? value === password
          ? true
          : "Passwords do not match"
        : "Confirm Password is required",
  };
};

export const getRequiredRules = (label: string, requiredMessage?: string) => {
  return {
    validate: (value: string) =>
      value?.trim()
        ? true
        : requiredMessage
        ? requiredMessage
        : `${label} ${strings.is_required}`,
  };
};

const phoneUtil = PhoneNumberUtil.getInstance();

export const isValidNumber = (phoneNumber: string) => {
  try {
    if (phoneNumber.indexOf(".") !== -1) {
      return false;
    }
    const phone = phoneUtil.parse(phoneNumber);
    return phoneUtil.isValidNumber(phone);
  } catch (error) {
    return false;
  }
};

export const getNumberData = (phoneNumber: string) => {
  try {
    if (phoneNumber.indexOf(".") !== -1) {
      return false;
    }
    const phone = phoneUtil.parse(phoneNumber);
    return phone;
  } catch (error) {
    return undefined;
  }
};

export const getPhoneNumberValidationRules = (country_code: string) => {
  return {
    validate: (value: string) =>
      (value || "").trim()
        ? isValidNumber(`${country_code ? "+" : ""}${country_code}${value}`)
          ? true
          : strings?.phone_number_is_invalid
        : strings?.phone_number_is_required,
  };
};

export const isValidInputNumber = (label: string) => {
  return {
    validate: (value: number) => (value ? true : `${label} is required`),
    pattern: {
      value: /^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$/,
      message: "Invalid Number",
    },
  };
};

export const isValidInputhours = (label: string) => {
  return {
    validate: (value: any) =>
      value !== undefined && value !== "" ? true : `${value} is required`,
    pattern: {
      value: /^[0-9]{1,2}$/,
      message: "Invalid Number",
    },
  };
};
