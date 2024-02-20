import { Dispatch, SetStateAction, useState } from "react";
import { Control, RegisterOptions, useController } from "react-hook-form";
import { INPUT_TYPES, SELECT_OPTIONS } from "../../Utils/Types";
import images from "../../Assets/images";
import InputText from "../InputText/InputText";
import CheckboxInput from "../CheckboxInput/CheckboxInput";
import DateInput from "../DateInput/DateInput";
import InputPhone from "../InputPhone/InputPhone";
import InputTextArea from "../InputTextArea/InputTextArea";
import FilePicker from "../FilePicker/FilePicker";
import ImagePicker from "../ImagePicker/ImagePicker";
import Image from "next/image";
import RadioInput from "../RadioInput/RadioInput";
import SwitchInput from "../SwitchInput/SwitchInput";
import InputMultiSelect from "../InputMultiSelect/InputMultiSelect";

export type FormInputProps = {
  name: string;
  label?: string;
  rules?: Omit<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">;
  defaultValue?: unknown;
  callingCodeName?: string;
  countryName?: string;
  control?: Control<any>;
  textInputProps?: any;
  setFocus?: (name: any) => void;
  type: INPUT_TYPES;
  textareaProps?: any;
  left?: any;
  leftWidth?: string | number;
  right?: any;
  rightWidth?: string | number;
  JSX?: (_props: Omit<FormInputProps, "JSX">) => any;
  placeholder?: string;
  radioData?: Array<{
    label: string;
    value: string;
  }>;
  checkboxData?: Array<{
    label: string;
    value: string;
  }>;
  trigger?: any;
  setValue?: any;
  min?: number;
  max?: number;
  disabledPhone?: boolean;
  value?: string;
  step?: number;
  multiSelectInputProps?: any;
  multiSwitchInputProps?: any;
  options?: Array<string>;
  singleSelect?: boolean;
  customCloseIcon?: boolean;
  cropData?: any;
  setCropData?: Dispatch<SetStateAction<File | undefined>>;
  checked?: boolean;
  onChange?: (value: any) => void;
  inputProps?: any;
  required?: boolean;
  disabledMultipleSelect?: boolean;
};

function FormInput(props: FormInputProps) {
  const {
    name,
    label,
    rules,
    defaultValue,
    control,
    textInputProps,
    type,
    JSX,
    step,
    callingCodeName = "countryCode",
    left,
    disabledPhone,
    countryName = "countryName",
    right,
    leftWidth,
    rightWidth,
    radioData,
    checkboxData,
    min,

    max,
    value,
    multiSelectInputProps,
    options,
    singleSelect,
    customCloseIcon,
    cropData,
    setCropData,
    checked,
    onChange,
    multiSwitchInputProps,
    inputProps,
    setValue,
    trigger,
    required,
    disabledMultipleSelect,
  } = props;
  const { field, formState } = useController({
    name,
    rules,
    defaultValue,
    control,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [enabled, setEnabled] = useState(false);
  switch (type) {
    case "text": {
      return (
        <InputText
          textInputProps={textInputProps}
          label={label}
          field={field}
          formState={formState}
          left={left}
          right={right}
          leftWidth={leftWidth}
          rightWidth={rightWidth}
        />
      );
    }
    case "email": {
      return (
        <InputText
          label={label}
          field={field}
          formState={formState}
          textInputProps={textInputProps}
          left={left}
          right={right}
        />
      );
    }
    case "password": {
      return (
        <InputText
          label={label}
          field={field}
          formState={formState}
          textInputProps={{
            ...textInputProps,
            type: showPassword ? "text" : "password",
          }}
          left={left}
          right={
            right ?? (
              <div
                className={
                  "absolute  right-0 flex items-center w-4 max-h-4 my-6 mr-4 bg-none justify-center bottom-0"
                }
                onClick={() => setShowPassword(!showPassword)}
              >
                <Image
                  src={showPassword ? images.eyeClose : images.eyeOpen}
                  alt={showPassword ? `close icon` : `open icon`}
                />
              </div>
            )
          }
        />
      );
    }
    case "radioInput": {
      return (
        <RadioInput
          label={label}
          field={field}
          formState={formState}
          textInputProps={textInputProps}
          left={left}
          right={right}
          radioData={radioData}
        />
      );
    }
    case "checkInput": {
      return (
        <CheckboxInput
          label={label}
          field={field}
          formState={formState}
          textInputProps={textInputProps}
          left={left}
          right={right}
          checkboxData={checkboxData}
        />
      );
    }

    case "date": {
      return (
        <DateInput
          label={label}
          field={field}
          formState={formState}
          textInputProps={textInputProps}
          left={left}
          right={right}
        />
      );
    }
    case "phone": {
      return (
        <InputPhone
          label={label}
          field={field}
          formState={formState}
          inputProps={{
            ...inputProps,
          }}
          right={right}
          countryName={countryName}
          value={value}
          disabled={disabledPhone}
          setValue={setValue}
          trigger={trigger}
          callingCodeName={callingCodeName}
          required={required}
        />
      );
    }
    // case "range": {
    //   return (
    //     <RangeInput
    //       label={label}
    //       field={field}
    //       formState={formState}
    //       textInputProps={{
    //         ...textInputProps,
    //       }}
    //       right={right}
    //       min={min}
    //       max={max}
    //       value={value}
    //       step={step}
    //     />
    //   );
    // }
    case "multiSelect": {
      return (
        <InputMultiSelect
          label={label}
          field={field}
          formState={formState}
          multiSelectInputProps={{
            ...multiSelectInputProps,
          }}
          options={options}
          singleSelect={singleSelect}
          customCloseIcon={customCloseIcon}
          disabledMultipleSelect={disabledMultipleSelect}
        />
      );
    }
    case "textArea": {
      return (
        <InputTextArea
          label={label}
          field={field}
          formState={formState}
          textInputProps={{
            ...textInputProps,
          }}
        />
      );
    }

    case "switch": {
      return (
        <SwitchInput
          label={label}
          field={field}
          formState={formState}
          multiSwitchInputProps={{ ...multiSwitchInputProps }}
          checked={checked}
          onChange={onChange}
        />
      );
    }
    case "file": {
      return <FilePicker label={label} field={field} formState={formState} />;
    }
    case "imageFile": {
      return (
        <ImagePicker
          label={label}
          field={field}
          formState={formState}
          cropData={cropData}
          setCropData={setCropData}
        />
      );
    }

    case "custom": {
      return JSX && JSX(props);
    }
  }
}

export default FormInput;
