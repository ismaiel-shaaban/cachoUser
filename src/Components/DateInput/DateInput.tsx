import React, { Fragment, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
//@ts-ignore
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import images from "../../Assets/images";
import moment from "moment";
import Image from "next/image";

type InputTextProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  textInputProps?: any;
  left?: any;
  right?: any;
  required?: boolean;
};

function DateInput(props: InputTextProps) {
  const { label, field, formState, textInputProps, left, right, required } =
    props;
  const errorMessage: any = formState.errors?.[field.name]?.message;
  const [focus, setFocus] = useState(false);
  const [startDate, setStartDate] = useState();
  return (
    <div>
      {label ? (
        <label className={"font-Poppins font-semibold"}>
          {label}
          {""}
          {required && (
            <span style={{ color: "#ffab40", fontSize: "16px" }}>*</span>
          )}
        </label>
      ) : (
        <Fragment />
      )}
      <div>
        {left}
        <DatePicker
          customInput={
            <div
              className={
                "flex space-x-72 cursor-pointer bg-eyeColor rounded-lg p-2"
              }
            >
              <span>
                {field?.value
                  ? moment(field?.value).format("DD-MM-YYYY")
                  : "DD-MM-YYYY"}
              </span>
              <div
                className={
                  "absolute right-3 flex items-center w-4 max-h-4 mb-3 mr-4 bg-none justify-center bottom-0"
                }
              >
                <Image src={images.calendar} alt="calendar icon" />
              </div>
            </div>
          }
          selected={field?.value ? Date.parse(field?.value) : null}
          minDate={new Date()}
          onChange={(date: any) => field?.onChange(date?.toString())}
          dateFormat="dd-MM-yyyy"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onBlur={() => {
            field.onBlur();
            setFocus(false);
          }}
          {...textInputProps}
        />
        {right}
        <input type="invalid" />
        <span className={errorMessage ? "show-error" : ""}>{errorMessage}</span>
      </div>
    </div>
  );
}
export default DateInput;
