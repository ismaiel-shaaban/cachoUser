import { useState } from "react";
import styles from "./ImageCropperModal.module.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Dialog } from "@headlessui/react";
import "cropperjs/dist/cropper.css";
import { getCropDataEvent } from "../ImagePicker/ImagePicker";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";

const EVENT = "DELETE_MODAL";
const CLOSE_EVENT = "CLOSE_DELETE_MODAL";

export const imageCropperModal = (data: any) => {
  emitEvent(EVENT, data);
};

export const closeImageCropperModal = () => {
  emitEvent(CLOSE_EVENT);
};

function ImageCropperModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [eventData, setEventData] = useState<any>();

  useEventEmitter(EVENT, (data) => {
    setIsOpen(true);
    setEventData(data);
  });

  useEventEmitter(CLOSE_EVENT, () => {
    setIsOpen(false);
  });
  const [cropper, setCropper] = useState<any>();

  function dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      var file = dataURLtoFile(
        cropper?.getCroppedCanvas()?.toDataURL(),
        "hello"
      );
      getCropDataEvent(file);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className={styles.imageCropperModalWrapper}>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className={
            "rounded-lg rounded-8 fixed inset-0 z-10 overflow-y-auto p-40 w-full "
          }
        >
          <div className="flex flex-col bg-powderblue text-black w-96 mx-auto text-center rounded-xl">
            <Dialog.Overlay className="fixed inset-0 bg-overlayColor opacity-30" />
            <Dialog.Description>
              <div>
                <div className={"relative"}>
                  <Cropper
                    className={"h-96 w-full"}
                    zoomTo={0.5}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={
                      eventData === undefined
                        ? ""
                        : URL.createObjectURL(eventData)
                    }
                    viewMode={1}
                    rotatable={true}
                    dragMode={"move"}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    onInitialized={(instance: any) => {
                      setCropper(instance);
                    }}
                    guides={true}
                  />
                </div>
                <div className={styles.modalFooter}>
                  <button onClick={getCropData}>Crop Image</button>
                </div>
              </div>
            </Dialog.Description>
          </div>
        </Dialog>
      </div>
    </>
  );
}
export default ImageCropperModal;
