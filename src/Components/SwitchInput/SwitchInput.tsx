import { Switch } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";

export type SwitchInputProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  multiSwitchInputProps?: any;
  left?: any;
  leftWidth?: string | number;
  right?: any;
  rightWidth?: string | number;
  placeholder?: any;
  className?: string;
  checked?: boolean;
  onChange?: (value: any) => void;
};

function SwitchInput(props: SwitchInputProps) {
  const { label, field, formState, left, right, multiSwitchInputProps } = props;
  const errorMessage = formState.errors?.[field.name]?.message;
  const [focus, setFocus] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

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
          className={"font-Poppins font-semibold"}
        >
          {label}
        </label>
      ) : (
        <Fragment />
      )}
      <div>
        {left}
        <Switch
          checked={field.onChange(
            (isEnabled && "i am active!") || (!isEnabled && "i am not active!")
          )}
          onChange={setIsEnabled}
          {...multiSwitchInputProps}
        >
          <span className=" bg-white rounded shadow p-2 h-20 w-56 flex">
            <span
              className={`block h-full w-1/2 rounded-3xl transition duration-300 ease-in-out transform ${
                isEnabled ? "bg-primary translate-x-full" : "bg-red-500"
              }`}
            ></span>
          </span>
          {isEnabled && "i am active!"}
          {!isEnabled && "i am not active!"}
        </Switch>
        {right}
      </div>
      <input type={"error"} />
      <span>{errorMessage?.toString()}</span>
    </div>
  );
}

export default SwitchInput;
