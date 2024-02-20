import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import styles from "./DeleteModal.module.css";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import Image from "next/image";
import images from "src/Assets/images";
const DELETE_MODAL = "delete-modal";

export const deleteModal = () => {
  emitEvent(DELETE_MODAL);
};
function DeleteModal() {
  let [isOpen, setIsOpen] = useState(false);
  useEventEmitter(DELETE_MODAL, () => {
    setIsOpen(true);
  });
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={
          "rounded-lg rounded-8 fixed inset-0 z-10 overflow-y-auto p-40 w-full"
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
              <Dialog.Panel className="w-full max-w-[314px] transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                <div className="py-[24px]  text-center">
                  <div className={styles.deleteWrap}>
                    <span>
                      <Image src={images.deleteIcon} />
                    </span>
                    <h3 className={styles.titleDel}>
                      Are you sure you want to delete this?
                    </h3>
                    <div className={styles.wrapButton}>
                      <button
                        className={`${styles.noBtn} max-w-[100px]  text-17 font-medium  w-full text-white rounded-[30px] min-h-[54px]`}
                      >
                        No
                      </button>
                      <button className="max-w-[100px]  text-17 font-medium bg-primary w-full text-white rounded-[30px] min-h-[54px]">
                        Yes
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DeleteModal;
