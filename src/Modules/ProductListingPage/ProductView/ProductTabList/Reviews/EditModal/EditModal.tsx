import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Rating } from "react-simple-star-rating";
import styles from "./EditModal.module.css";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import FormBuilder from "src/Components/FormBuilder/FormBuilder";
import { useForm } from "react-hook-form";

const EDIT_MODAL = "edit-modal";
export const editModal = () => {
  emitEvent(EDIT_MODAL);
};
function EditModal() {
  const [ratingValue, setRatingValue] = useState(0);
  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      openTime: "",
      closeTime: "",
    },
    mode: "onChange",
  });

  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };
  let [isOpen, setIsOpen] = useState(false);

  useEventEmitter(EDIT_MODAL, () => {
    setIsOpen(true);
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={
          "rounded-lg rounded-8 fixed inset-0 z-10 overflow-y-auto p-40 w-full "
        }
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-[607px] transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                <div className="py-[24px]  text-center">
                  <form className={styles.editReviewForm}>
                    <div className={styles.customUpper}>
                      <h4 className="text-[16px] font-[600] text-black">
                        Edit Review
                      </h4>
                      <span className={styles.cross}>X</span>
                    </div>
                    <div className={styles.stars}>
                      <Rating onClick={handleRating} />
                    </div>
                    <div className={styles.formWrapBox}>
                      <FormBuilder
                        control={control}
                        formState={formState}
                        formConfigArray={[
                          [
                            {
                              name: "product",
                              type: "multiSelect",
                              label: "Product",
                              multiSelectInputProps: {
                                placeholder: "Select Product",
                              },
                              // options: Hour_DATA,
                              singleSelect: true,
                            },
                          ],

                          [
                            {
                              name: "writeReview",
                              type: "textArea",
                              label: "Write Review",
                              multiSelectInputProps: {
                                placeholder: "Write Review Here",
                              },

                              // options: Hour_DATA,
                              singleSelect: true,
                            },
                          ],
                        ]}
                      />

                      <div className={styles.buttonWrapper}>
                        <button
                          type="button"
                          className={`${styles.cancelBtn} "max-w-[300px]  text-17 font-medium  w-full text-white rounded-[30px] min-h-[54px] `}
                          onClick={() => setIsOpen(false)}
                        >
                          cancel
                        </button>
                        <button
                          type="submit"
                          className="max-w-[300px]  text-17 font-medium bg-primary w-full text-white rounded-[30px] min-h-[54px]"
                        >
                          update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div>
                  {/* <div className={styles.selectForm}>
                    <h4>Product</h4>
                    <Multiselect
                      isInvalid={errorMessage}
                      onFocus={() => setFocus(true)}
                      {...field}
                      onBlur={() => { 
                        field.onBlur();
                        setFocus(false);
                      }}
                      singleSelect={true}
                      customCloseIcon={customCloseIcon}
                      isObject={false}
                      onRemove={(event: any) => field.onChange(event)}
                      onSelect={(event: any) => field.onChange(event)}
                      options={options}
                      {...multiSelectInputProps}
                      showCheckbox
                      className={styles?.listColor}
                    />
                  </div> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default EditModal;
