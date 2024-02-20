import { Fragment, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import MultiRangeSlider from "multi-range-slider-react";
import styles from "./RangeInput.module.css";

type RangeInputProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  textInputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  formState: UseFormStateReturn<FieldValues>;
  left?: any;
  leftWidth?: string | number;
  right?: any;
  rightWidth?: string | number;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
};

function RangeInput(props: RangeInputProps) {
  const { label, field, formState, left, right } = props;
  const errorMessage = formState.errors?.[field.name]?.message;
  const [focus, setFocus] = useState(false);
  const labelColor = errorMessage
    ? "error"
    : field.value
    ? "primary"
    : focus
    ? "primary"
    : "text";
  const [minValue, setminValue] = useState(25);
  const [maxValue, setmaxValue] = useState(75);

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
        <MultiRangeSlider
          min={0}
          max={100}
          step={1}
          minValue={minValue}
          maxValue={maxValue}
          onInput={(e) => field.onChange(`${e.minValue},${e.maxValue}`)}
          baseClassName="multi-range-slider-black"
          label={false}
          ruler={false}
          className={styles.borderRange}
          barLeftColor="white"
          barRightColor="white"
          barInnerColor="rgb(0,74,173)"
          thumbLeftColor={"efefef"}
        />
        {right}
      </div>
      <div>{errorMessage?.toString()}</div>
    </div>
  );
}

export default RangeInput;
