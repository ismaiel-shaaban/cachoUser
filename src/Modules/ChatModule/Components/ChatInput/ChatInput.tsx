import React, { useState } from "react";
import styles from "./ChatInput.module.css";
import { EVENTS } from "../../Hooks/useChatListeners";
import useChatEmit from "../../Hooks/useChatEmit";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { queryClient } from "src/Utils/ReactQueryConfig";
import { CHAT_HISTORY_INFINITE_QUERY_KEY } from "../../Hooks/useChatHistoryInfiniteQuery";
import { combineStringIds } from "src/Utils/Helpers";
import { unblockPopup } from "../RightChatLayout/UserUnBlockPop/UserUnBlockPop";
import useChatHistoryQuery from "../../Hooks/useChatHistoryQuery";
import { GET_PARTICIPANT_LIST_KEY } from "../../Hooks/useChatParticipantsInfiniteQuery";
import { strings } from "src/Utils/Localization";

function ChatInput(props: any) {
  const {
    vendorId,
    firstParticipantId,
    secondParticipantId,
    setUserBlockData,
    chatHistoryList,
  } = props;
  const { user } = useAuthValue();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const { emitEvent: emitEventWS } = useChatEmit();
  const recieverId =
    firstParticipantId === user?._id ? secondParticipantId : firstParticipantId;
  const sendChatMessage = () => {
    if (message?.trim()) {
      emitEventWS(
        EVENTS.SEND_MESSAGE,
        {
          message: message.trim(),
          receiverId: vendorId === undefined ? recieverId : vendorId,
          receiverType: "VENDOR",
        },
        (response) => {
          if (response.status === 201) {
            setMessage("");
            setLoading(false);
            const participantsId = combineStringIds(
              response?.data?.receiverId,
              response?.data?.senderId
            );
            queryClient.setQueryData(
              CHAT_HISTORY_INFINITE_QUERY_KEY(participantsId),
              (oldData: any) => {
                const newData = { ...oldData };
                const latestPage = [...(newData?.pages[0] ?? [])];
                latestPage?.unshift(response?.data);
                const allPages = [...newData?.pages];
                allPages[0] = latestPage;
                return {
                  ...oldData,
                  pages: allPages,
                };
              }
            );
          }
        }
      );
      queryClient.refetchQueries(GET_PARTICIPANT_LIST_KEY(1));
    }
  };
  const intializedChat = () => {
    if (message?.trim()) {
      emitEventWS(
        EVENTS?.INIT_CHAT,
        {
          receiverId: vendorId === undefined ? recieverId : vendorId,
          senderId: user?._id,
        },
        (response) => {
          if (response.status === 201) {
            sendChatMessage();
          }
        }
      );
    }
  };
  const blockedUserId =
    firstParticipantId === user?._id ? secondParticipantId : firstParticipantId;
  const getChatHistoryData = useChatHistoryQuery(
    {
      firstParticipantId: user?._id,
      secondParticipantId:
        blockedUserId === undefined ? vendorId : blockedUserId,
    },
    (response: any) => {
      setUserBlockData(response?.data);
    }
  );
  const chatHistoryData = getChatHistoryData?.data?.data;
  const { language } = useAuthValue();

  return (
    <>
      {chatHistoryData?.blockData !== null && (
        <div className={styles.clickHere}>
          <span className="text-[13px] font-[400] text-spanColor">
            {strings?.blocked_this_contact}{" "}
          </span>
          <a
            className={`${styles.unbockText} text-[13px] font-[600] text-activeClr`}
            onClick={() => unblockPopup(vendorId ? vendorId : blockedUserId)}
          >
           {strings?.click_here_unblock}
          </a>
        </div>
      )}
      {chatHistoryData?.blockOtherData === null &&
        chatHistoryData?.blockData === null && (

          <div className={language==="ar"?`${styles.msgerinputarea} ${styles.arabicmMgerinputarea} `:` ${styles.msgerinputarea} `} >
            <textarea
              className="resize rounded-md"
              placeholder={`${strings?.componse_message}...`}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyDown={(event) => {
                if (event.key !== "Enter") {
                  return;
                } else if (chatHistoryList.length === 0) {
                  intializedChat();
                } else {
                  sendChatMessage();
                }
              }}
            ></textarea>
            <button
              type="button"
              className={styles.msgersendbtn}
              onClick={() => {
                if (chatHistoryList.length === 0) {
                  intializedChat();
                } else {
                  sendChatMessage();
                }
              }}
              disabled={loading}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0381 1.01322C22.3986 1.43163 22.3516 2.06305 21.9332 2.42354L11.2933 11.5902C10.8749 11.9507 10.2435 11.9037 9.88302 11.4853C9.52254 11.0669 9.5695 10.4355 9.98792 10.075L20.6278 0.908319C21.0462 0.547838 21.6776 0.594803 22.0381 1.01322Z" fill="#133B6E"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.0181 0.992459C22.2774 1.27715 22.3503 1.6855 22.2053 2.0423L15.4345 18.709C15.2875 19.0708 14.9433 19.3139 14.5532 19.3316C14.163 19.3492 13.7983 19.1381 13.6193 18.7911L9.92513 11.6301L1.57601 8.43314C1.17663 8.28021 0.918694 7.89024 0.934261 7.46286C0.949828 7.03548 1.23545 6.66531 1.6449 6.54184L20.9901 0.708508C21.3589 0.597321 21.7587 0.707766 22.0181 0.992459ZM5.0241 7.61183L10.9965 9.89872C11.226 9.98657 11.415 10.1558 11.5277 10.3741L14.3999 15.9418L19.5652 3.22712L5.0241 7.61183Z" fill="#133B6E"/>
              </svg>
            </button>
          </div>
        )}
    </>
  );
}
export default ChatInput;
