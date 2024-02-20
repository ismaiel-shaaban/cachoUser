import { useEffect, useState } from "react";
import useChatEmit from "./useChatEmit";
import ChatClient from "../Utils/ChatClients";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import { useRouter } from "next/router";
import { queryClient } from "src/Utils/ReactQueryConfig";
import { CHAT_HISTORY_INFINITE_QUERY_KEY } from "./useChatHistoryInfiniteQuery";
import { combineStringIds } from "src/Utils/Helpers";
import useChatEvent from "./useChatEvent";
import { GET_PARTICIPANT_LIST_KEY } from "./useChatParticipantsInfiniteQuery";

export const EVENTS = {
  INIT: "init",
  MANUAL_DISCONNECT: "manualDisconnect",
  SEND_MESSAGE: "sendMessage",
  ON_CONNECT: "connect",
  ON_DISCONNECT: "disconnect",
  ON_RECEIVE_MESSAGE: "receiveMessage",
  ON_READ_MESSAGE: "readAllMessage",
  BLOCK_USER: "blockUser",
  BLOCKED_AND_UNBLOCKED_USER_ACTION: "blockAction",
  UNBLOCK_USER: "unblockUser",
  INIT_CHAT: "initChat",
};

function useChatListeners() {
  const [ws, setWs] = useState<any>();
  const { emitEvent: emitEventWS } = useChatEmit();
  const { loggedIn, user } = useAuthValue();
  const router = useRouter();
  // console.log("rouuuuuuuuuuuuuuuu",router)
  // const { id: pId, firstParticipant, secondParticipant } = router?.query;
  // const _firstParticipant: any = firstParticipant;
  // const _secondParticipant: any = secondParticipant;

  // const combinedParticipantId = combineStringIds(
  //   _firstParticipant,
  //   _secondParticipant
  // );

  useEffect(() => {
    if (loggedIn) {
      setWs(ChatClient.connect());
    }
  }, [loggedIn]);

  useChatEvent(ws, EVENTS.ON_CONNECT, () => {
    emitEventWS(EVENTS.INIT, {}, (data: any) => {
      if (data.status === 200) {
        // const secondParticipants = router?.query?.secondParticipant ?? "";
        // SnackbarHandler.successToast("You are online");
      }
    });
  });

  // useChatEvent(ws, EVENTS.ON_DISCONNECT, () => {
  //   SnackbarHandler.errorToast("You are offline");
  // });

  useChatEvent(ws, EVENTS.ON_RECEIVE_MESSAGE, (res: any) => {
    if (res?.status === 200 || res?.status === 201) {
      const participantsId = combineStringIds(
        res?.data?.receiverId,
        res?.data?.senderId
      );
      queryClient.setQueryData(
        CHAT_HISTORY_INFINITE_QUERY_KEY(participantsId),
        (oldData?: any) => {
          const newData = { ...oldData };
          const latestPage = [...(newData?.pages[0] ?? [])];
          latestPage?.unshift(res?.data);
          const allPages = [...newData?.pages];
          allPages[0] = latestPage;
          return {
            ...oldData,
            pages: allPages,
          };
        }
      );
    }
  });
  useChatEvent(ws, EVENTS.BLOCKED_AND_UNBLOCKED_USER_ACTION, (data: any) => {
    console.log("/////////////////", data);
    if (data.status === 200 || 201) {
      const participantIds = combineStringIds(
        data?.blockedBy,
        data?.blockedUser
      );
      queryClient.refetchQueries(GET_PARTICIPANT_LIST_KEY(""));
      queryClient?.refetchQueries(
        CHAT_HISTORY_INFINITE_QUERY_KEY(participantIds)
      );
    }
  });
}

// if (data?.status === 201) {
// SnackbarHandler.errorToast("Message Received")
// queryClient.refetchQueries(CHAT_PARTICIPANTS_QUERY_KEY(1));
// queryClient.refetchQueries(CHAT_HISTORY_INFINITE_QUERY_KEY({
//   firstParticipant: data?.data?.senderId,
//   secondParticipant:data?.data?.receiverId
// }))

// if (
//   data.messageType === 4 ||
//   data.messageType === 5 ||
//   data.messageType === 6
// ) {
// queryClient.refetchQueries(CHAT_PARTICIPANTS_QUERY_KEY(""));
// return queryClient.refetchQueries(
//   CHAT_HISTORY_INFINITE_QUERY_KEY(
//     data.productId,
//     combineStringIds(data.senderId, data.receiverId)
//   )
// );
// }

// emitEvent("CHAT_MESSAGE_INCOMING", data.data);
// updateChatMessages(data?.data);

// queryClient.refetchQueries(CHAT_PARTICIPANTS_QUERY_KEY(""));
// }
// });
// )

export default useChatListeners;
