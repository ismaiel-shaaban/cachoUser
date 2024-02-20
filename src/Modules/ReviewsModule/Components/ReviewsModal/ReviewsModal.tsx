import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import images from "src/Assets/images";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import styles from "./ReviewsModal.module.css";
import { strings } from "src/Utils/Localization";

const EVENT = "OPEN_REVIEW";
export const openReview = () => {
  emitEvent(EVENT);
};

function ReviewsModal() {
  let [isOpen, setIsOpen] = useState(false);
  useEventEmitter(EVENT, () => {
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
              <Dialog.Panel className="w-full max-w-[380px] transform overflow-hidden rounded-2xl bg-[#F4F5F9]  text-left align-middle shadow-xl transition-all">
                <div className="py-[24px] px-[17px] ">
                  <div>
                    <h6 className="font-[700] text-[18px] text-center">
                      Edit Your Review
                    </h6>
                  </div>

                  <div className="flex justify-between my-[14px]">
                    <p className="font-[500] text-[12px]">Your Rating</p>
                    <div className="w-[82px]">
                      <Image src={images.reviewStarImg} alt="rate" />
                    </div>
                  </div>
                  <div>
                    <p className="font-[500] text-[12px]">Your Review</p>
                    <div className="mt-[6px]">
                      <textarea
                        className={`w-full h-[125px] rounded-[10px] py-[7px] px-[10px] ${styles.textAreaCss}`}
                      >
                        abcd@gmail.com
                      </textarea>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-[20px] mb-[30px]">
                  <button
                    className={`${styles.reviewRateBtn} border border-primary text-primary`}
                    onClick={() => setIsOpen(false)}
                  >
                    {strings?.cancel}
                  </button>
                  <button
                    className={`${styles.reviewRateBtn} text-[#fff] bg-primary`}
                  >
                    Update Review
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ReviewsModal;
