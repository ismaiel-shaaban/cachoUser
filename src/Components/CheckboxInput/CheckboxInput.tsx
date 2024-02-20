import { Fragment, useCallback } from "react";
import { ControllerRenderProps } from "react-hook-form";

type CheckboxInputProps = {
  label?: string;
  field: ControllerRenderProps<any, string>;
  formState: any;
  textInputProps?: any;
  left?: any;
  right?: any;
  checkboxData?: Array<{
    label: string;
    value: string;
  }>;
};

function CheckboxInput(props: CheckboxInputProps) {
  const { label, field, formState, checkboxData = [], textInputProps } = props;
  const errorMessage = formState.errors?.[field.name]?.message;

  const setValues = useCallback(
    (_value: any) => {
      const values = field.value;
      if (!values.includes(_value)) {
        field.onChange([...values, _value]);
      } else {
        field.onChange(values.filter((_str: any) => _str !== _value));
      }
    },
    [field]
  );

  return (
    <div>
      <div>
        <div>
          {label ? (
            <label className={"font-semibold"}>{label}</label>
          ) : (
            <Fragment />
          )}
          <div>
            <div className={"flex gap-10"}>
              {checkboxData.map((value: any, index: any) => {
                return (
                  <div key={index}>
                    <label className={"flex gap-1"}>
                      <input
                        type={"checkbox"}
                        id={`checkbox-${label}-9+${index}`}
                        checked={(field.value || []).includes(value.value)}
                        {...field}
                        {...textInputProps}
                        onChange={() => {
                          setValues(value?.value);
                        }}
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

export default CheckboxInput;
