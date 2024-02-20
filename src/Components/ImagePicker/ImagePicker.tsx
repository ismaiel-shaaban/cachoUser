import { Fragment } from "react";
import {
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import ImageCropperModal, {
  imageCropperModal,
} from "../ImageCropperModal/ImageCropperModal";

import styles from "./ImagePicker.module.css";
import Image from "next/image";

const GETCROPDATA = "GET_CROP_DATA";

type FilePickerProps = {
  label?: string;
  field: ControllerRenderProps<FieldValues, string>;
  formState: UseFormStateReturn<FieldValues>;
  left?: any;
  right?: any;
  cropData: File | any;
  setCropData: any;
  profileImg?: string | null;
};

export const getCropDataEvent = (data: any) => {
  emitEvent(GETCROPDATA, data);
};

function FilePicker(props: FilePickerProps) {
  const { label, field, left, right, profileImg = null } = props;

  useEventEmitter(GETCROPDATA, (data: any) => {
    field?.onChange(data);
  });

  return (
    <div>
      {label ? (
        <label htmlFor={"addPhoto"} className={"font-Poppins font-semibold"}>
          {label}
        </label>
      ) : (
        <Fragment />
      )}
      <div className={styles?.selectButton}>
        {left}

        <div>
          <label htmlFor="addPhoto">
            <div className={styles.UploadText}>
              <p>{profileImg === null ? "Select Image" : "Update Image"}</p>
            </div>
          </label>
          <input
            type="file"
            name="myfile"
            accept=".jpg,.png,.jpeg"
            onChange={(e: any) => imageCropperModal(e.target.files[0])}
            id="addPhoto"
            className="hidden"
          />
        </div>
        {right}
      </div>
      <div>
        {field?.value && (
          <div>
            <Image
              src={
                field?.value !== undefined
                  ? URL.createObjectURL(field?.value)
                  : `${profileImg}`
              }
              alt="thumb"
              height={100}
              width={100}
              className={"mt-2"}
            />
            <button
              type="button"
              onClick={() => {
                field.onChange(undefined);
              }}
            >
              x
            </button>
          </div>
        )}
      </div>
      <ImageCropperModal />
    </div>
  );
}
export default FilePicker;
