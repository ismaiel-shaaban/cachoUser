import { Fragment, useState } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
type FilePickerProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  left?: any;
  right?: any;
};
function FilePicker(props: FilePickerProps) {
  const { label, field, formState, left, right } = props;
  const [file, setFile] = useState();

  const handleChange = (event: any) => {
    field?.onChange(event.target.files);
  };
  return (
    <div>
      {label ? (
        <label htmlFor={field.name} className={"font-Poppins font-semibold"}>
          {label}
        </label>
      ) : (
        <Fragment />
      )}
      <div>
        {left}
        <input type={"file"} accept={".pdf"} onChange={handleChange} />
        {right}
      </div>
    </div>
  );
}
export default FilePicker;
