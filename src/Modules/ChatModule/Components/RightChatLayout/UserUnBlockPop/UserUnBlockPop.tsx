import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import styles from "./UserUnBlockPop.module.css";
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

const UNBLOCK_POPUP = "unblock-popup";
export const unblockPopup = (data: any) => {
  emitEvent(UNBLOCK_POPUP, data);
};

function UserUnBlockPop() {
  let [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthValue();
  const [vendorId, setVendorId] = useState("");

  useEventEmitter(UNBLOCK_POPUP, (data) => {
    setVendorId(data);
    setIsOpen(true);
  });
  const { emitEvent: emitEventWS } = useChatEmit();
  const unBlockUser = () => {
    emitEventWS(
      EVENTS?.UNBLOCK_USER,
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
                    {`${strings.unblock} ${vendorName}`}
                  </h4>
                  <p className="text-[15px] font-[400] text-gray">
                    {`${strings.do_you_want_to} ${strings.unblock} ${vendorName}`}
                  </p>
                  <div
                    className={`${styles.buttonRow}  flex gap-[10px] justify-between pt-[10px]`}
                  >
                    <button
                      type="button"
                      onClick={()=>setIsOpen(false)}
                      className={`${styles.goBack} inline-flex justify-center   py-[12px] border-primary text-primary  text-[16px] rounded-[30px] `}
                    >
                   {strings?.go_back}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center capitalize  text-white bg-primary   py-[12px] font-medium text-[16px] rounded-[30px] "
                      onClick={unBlockUser}
                    >
                      {strings?.unblock}
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

export default UserUnBlockPop;
