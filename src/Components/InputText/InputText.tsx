import { Fragment, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import styles from "./InputText.module.css";

type InputTextProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  textInputProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  formState: UseFormStateReturn<FieldValues>;
  left?: any;
  leftWidth?: string | number;
  right?: any;
  rightWidth?: string | number;
  customClassName?: string;
};

function InputText(props: InputTextProps) {
  const {
    label,
    field,
    formState,
    left,
    right,
    textInputProps,
    customClassName,
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

  return (
    <div>
      {label ? (
        <label
          htmlFor={field.name}
          color={labelColor}
          className={"font-Poppins font-semibold"}
        >
          {label}
        </label>
      ) : (
        <Fragment />
      )}
      <div className={styles.aaaa}>
        {left}
        <input
          id={field.name}
          type="text"
          onFocus={() => setFocus(true)}
          {...field}
          onBlur={() => {
            field.onBlur();
            setFocus(false);
          }}
          {...textInputProps}
          className={`${customClassName} ${
            errorMessage ? styles.errorMessage : styles.inputStyle
          }`}
        />
        {right}
      </div>
      <div className={"text-lightRed"}>{errorMessage?.toString()}</div>
    </div>
  );
}

export default InputText;
