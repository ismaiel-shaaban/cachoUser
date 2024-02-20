import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import styles from "./ProductViewModal.module.css";

const VIEW_ALL_EVENT = "VIEW_ALL_EVENT";
export const ViewAllEvent = (data: any) => {
  emitEvent(VIEW_ALL_EVENT, data);
};
function ProductViewModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [attributes, setAttibutes] = useState([]);
  useEventEmitter(VIEW_ALL_EVENT, (data) => {
    setAttibutes(data);

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
              <Dialog.Panel className="w-full max-w-[606px] transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                <div className="py-[24px]  text-center">
                  <div className={`${styles.customUpper} px-[17px]`}>
                    <h3 className="text-[16px] font-[600] text-black">
                      {" "}
                      Product description
                    </h3>
                    <span
                      className={`${styles.pointer} text-[16px] font-[600] text-black`}
                      onClick={() => setIsOpen(false)}
                    >
                      X
                    </span>
                  </div>
                  <ul className={`${styles.productList} px-[46px] pt-2.5`}>
                    {attributes?.length !== 0
                      ? attributes?.map((item: any, index: any) => {
                          return (
                            <li
                              className={`${styles.list} flex justify-between py-2`}
                              key={`item${index}`}
                            >
                              <p className="text-[12px] font-[700] text-black">
                                {item?.attributeName}
                              </p>
                              <span className="text-[12px] font-[400] text-black">
                                {item?.name}
                              </span>
                            </li>
                          );
                        })
                      : "No Attibutes Available"}

                    {/* <li className={`${styles.list} flex justify-between py-2`}>
                            <p className='text-[12px] font-[700] text-black'>Size</p>
                            <span className='text-[12px] font-[400] text-black'>All Sizes</span>
                        </li>
                        <li className={`${styles.list} flex justify-between py-2`}>
                            <p className='text-[12px] font-[700] text-black'>Brand</p>
                            <span className='text-[12px] font-[400] text-black'>MobileCoderz</span>
                        </li>
                        <li className={`${styles.list} flex justify-between py-2`}>
                            <p className='text-[12px] font-[700] text-black'>WashCare</p>
                            <span className='text-[12px] font-[400] text-black'>Machine Wash</span>
                        </li> */}
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ProductViewModal;
