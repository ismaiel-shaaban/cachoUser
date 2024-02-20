import React, { Fragment, useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

type RadioInputProps = {
  label?: string;
  field: ControllerRenderProps<any, string>;
  formState: any;
  textInputProps?: any;
  left?: any;
  right?: any;
  radioData?: Array<{
    label: string;
    value: string;
  }>;
};

function RadioInput(props: RadioInputProps) {
  const { label, field, formState, radioData = [] } = props;
  const errorMessage = formState.errors?.[field.name]?.message;

  return (
    <div>
      <div>
        <div>
          {label ? (
            <label className={"font-Poppins font-semibold"}>{label}</label>
          ) : (
            <Fragment />
          )}
          <div>
            <div className={"flex gap-10"}>
              {radioData.map((value, index) => {
                return (
                  <div key={index}>
                    <label className="flex gap-1">
                      <input
                        type={"radio"}
                        id={`inline-${label}-9+${index}`}
                        checked={field.value === value?.value}
                        onClick={() => field.onChange(value?.value)}
                      />
                      {value?.label}
                    </label>
                  </div>
                );
              })}
            </div>
            <span>{errorMessage}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RadioInput;
