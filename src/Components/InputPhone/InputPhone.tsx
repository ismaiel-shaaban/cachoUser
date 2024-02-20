import React, { Fragment, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { strings } from "src/Utils/Localization";

type InputPhoneProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: any;
  right?: any;
  trigger?: any;
  setValue?: any;
  callingCodeName: string;
  countryName: string;
  required?: boolean;
  value?: string;
  inputProps?: any;
  disabled: boolean | any;
};

function InputPhone(props: InputPhoneProps) {
  const {
    label,
    field,
    formState,
    textInputProps,
    right,
    setValue,
    trigger,
    callingCodeName,
    required,
    value,
    countryName,
    inputProps,
    disabled,
  } = props;
  const errorMessage: any = formState.errors?.[field.name]?.message;
  const [focus, setFocus] = useState(false);

  return (
    <div>
      {label ? (
        <label
          className={
            errorMessage ? "text-danger" : focus ? "text-primary" : undefined
          }
        >
          {label}{" "}
          {required && (
            <span style={{ color: "#ffab40", fontSize: "17px" }}>*</span>
          )}
        </label>
      ) : (
        <Fragment />
      )}
      <div>
        <PhoneInput
          country={"sa"}
          buttonClass={"p-2"}
          enableSearch
          autocompleteSearch
          countryCodeEditable={false}
          value={value}
          excludeCountries={["il"]}
          disabled={disabled}
          onBlur={() => {
            field.onBlur();
            setFocus(false);
          }}
          onChange={(value: string, data: any) => {
            setValue(callingCodeName, "+" + data.dialCode);
            setValue(countryName, data.name);
            setValue(field.name, value.replace(data.dialCode, ""));
            setTimeout(() => {
              trigger(field.name);
            }, 100);
          }}
          inputProps={{
            className: `phone-control-custom ${
              errorMessage ? "text-danger" : ""
            }`,
            placeholder: strings?.phone_number,
          }}
        />
        {right}
        <div
          className="errorMessage"
          style={{ display: errorMessage ? "block" : "none" }}
        >
          {errorMessage}
        </div>
      </div>
    </div>
  );
}

export default InputPhone;
