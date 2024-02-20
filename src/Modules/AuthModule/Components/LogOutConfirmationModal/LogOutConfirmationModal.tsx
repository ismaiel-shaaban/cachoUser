import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
//@ts-ignore
import { GrClose } from "react-icons/gr";
import images from "src/Assets/images";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import AuthService from "../../Services/AuthService";
import styles from "./LogOutConfirmation.module.css";
import { strings } from "src/Utils/Localization";
import useLogoutMutation from "../../Hooks/useLogoutMutation";
import useAuthValue from "../../Hooks/useAuthValue";

const EVENT = "OPEN_LOGOUT";
export const openLogOut = (value: any) => {
  emitEvent(EVENT, value);
};

function LogOutConfirmationModal() {
  const router = useRouter();
  let [isOpen, setIsOpen] = useState(false);

  useEventEmitter(EVENT, () => {
    setIsOpen(true);
  });
  const { mutate } = useLogoutMutation(() => {
    setIsOpen(false);
    sessionStorage.removeItem("productCategoryQuery");
  });
  const { language } = useAuthValue();

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
              <Dialog.Panel className="w-full max-w-[314px] transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                <div className="py-[24px] px-[17px] text-center">
                  <div className="relative w-[50px] h-[50px] mx-auto">
                    <Image
                      src={images.logoutPop}
                      alt="logout pop image"
                      layout="fill"
                    />
                  </div>

                  <p className=" font-normal text-[15px] text-black leading-[150%] mt-[24px]">
                    {strings?.are_u_sure_u_want_to}
                    <br /> {strings?.logout}.
                  </p>
                </div>

                <div
                  className={
                    language === "ar"
                      ? ` ${styles.btnRow} flex justify-center gap-[20px] mb-[32px] ${styles.arabicBtnRow} flex justify-center flex-row-reverse gap-[20px] mb-[32px] `
                      : ` ${styles.btnRow} flex justify-center gap-[20px] mb-[32px]`
                  }
                >
                  <button
                    className={`${styles.logOutButton} border border-lightPrimary text-lightPrimary`}
                    onClick={() => setIsOpen(false)}
                  >
                    {strings?.no}
                  </button>
                  <button
                    className={`${styles.logOutButton} text-[#fff] bg-primary`}
                    onClick={() => mutate()}
                  >
                    {strings?.yes}
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

export default LogOutConfirmationModal;
