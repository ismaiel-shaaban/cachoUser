import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import styles from "./BlockPopup.module.css";
import useEventEmitter, { emitEvent } from "src/Hooks/useEventEmmiter";
import Image from "next/image";
import images from "src/Assets/images";
import useChatEmit from "src/Modules/ChatModule/Hooks/useChatEmit";
import { EVENTS } from "src/Modules/ChatModule/Hooks/useChatListeners";
import { combineStringIds } from "src/Utils/Helpers";
import { queryClient } from "src/Utils/ReactQueryConfig";
import { CHAT_HISTORY_INFINITE_QUERY_KEY } from "src/Modules/ChatModule/Hooks/useChatHistoryInfiniteQuery";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { CHAT_HISTORY_QUERY_KEY } from "src/Modules/ChatModule/Hooks/useChatHistoryQuery";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import { useRouter } from "next/router";
import { strings } from "src/Utils/Localization";
import { GET_PARTICIPANT_LIST_KEY } from "src/Modules/ChatModule/Hooks/useChatParticipantsInfiniteQuery";

const BLOCK_POPUP = "block-popup";
export const blockPopup = (data: any) => {
  emitEvent(BLOCK_POPUP, data);
};
function BlockPopup() {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthValue();
  const [vendorId, setVendorId] = useState("");

  useEventEmitter(BLOCK_POPUP, (data) => {
    setVendorId(data);
    setIsOpen(true);
  });
  const { emitEvent: emitEventWS } = useChatEmit();
  const blockUser = () => {
    emitEventWS(
      EVENTS?.BLOCK_USER,
      {
        blockedUser: vendorId,
        blockedUserType: "VENDOR",
      },
      (response) => {
        const pariticipantIds = combineStringIds(
          response?.data?.blockedBy,
          response?.data?.blockedUser
        );
        queryClient.refetchQueries(GET_PARTICIPANT_LIST_KEY(""));
        queryClient.refetchQueries(CHAT_HISTORY_QUERY_KEY(pariticipantIds));
        setIsOpen(false);
        SnackbarHandler.successToast(response?.message);
      }
    );
  };
  const router = useRouter();
  const vendorName = router?.query?.vendorName;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={
          "rounded-lg rounded-8 fixed inset-0 z-[999] overflow-y-auto p-40 w-full "
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
              <Dialog.Panel className="w-full max-w-[327px] transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                <div className={styles.blockPopupWrapper}>
                  <div
                    className={`${styles.imgWrap} relative w-[60px] h-[60px] rounded-[20px]`}
                  >
                    <Image
                      src={images.chatProfile}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h4 className="text-[17px] font-[700] text-black">
                    {`${strings.block} ${vendorName}`}
                  </h4>
                  <p className="text-[15px] font-[400] text-gray">
                    {`${strings.are_u_sure_u_want_to} ${strings.block} ${vendorName}`}
                  </p>
                  <div
                    className={`${styles.buttonRow} pb-[10px] flex gap-[15px] justify-between`}
                  >
                    <button
                      type="button"
                      className={`${styles.goBack} inline-flex justify-center   py-[12px] border-primary text-primary  text-[16px] rounded-[30px] `}
                      onClick={() => setIsOpen(false)}
                    >
                      {strings?.go_back}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center capitalize  text-white bg-primary   py-[12px] font-medium text-[16px] rounded-[30px] "
                      onClick={blockUser}
                    >
                    {strings?.block}
                    </button>
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

export default BlockPopup;
