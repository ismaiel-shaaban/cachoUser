import { Fragment, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

export type InputTextProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: any;
  left?: any;
  leftWidth?: string | number;
  right?: any;
  rightWidth?: string | number;
  placeholder?: any;
  className?: string;
};

function InputTextarea(props: InputTextProps) {
  const {
    label,
    field,
    formState,
    textInputProps,
    left,
    right,
    leftWidth,
    rightWidth,
    placeholder,
  } = props;
  const errorMessage = formState.errors?.[field.name]?.message;
  const [focus, setFocus] = useState(false);
  const labelColor = errorMessage
    ? "error"
    : field.value
    ? "primary"
    : focus
    ? "primary"
    : "text";
  const inputColor = errorMessage
    ? "error"
    : field.value
    ? "primary"
    : focus
    ? "primary"
    : "divider";
  return (
    <div>
      {label ? (
        <label
          htmlFor={field.name}
          color={labelColor}
        >
          {label}
        </label>
      ) : (
        <Fragment />
      )}
      <div>
        {left}
        <textarea
          id={field.name}
          type="text"
          isInvalid={errorMessage ? true : false}
          focusBorderColor={inputColor}
          errorBorderColor={inputColor}
          onFocus={() => setFocus(true)}
          {...field}
          onBlur={() => {
            field.onBlur();
            setFocus(false);
          }}
          pl={leftWidth}
          pr={rightWidth}
          placeholder={placeholder}
          {...textInputProps}
          className={"w-full min-h-120 bg-eyeColor rounded-3xl p-2"}
        />
        {right}
      </div>
      <input type={"error"} className="errorInput"/>
      <span className="errormessage">{errorMessage?.toString()}</span>
    </div>
  );
}

export default InputTextarea;
