import { AxiosResponse } from "axios";
import { useInfiniteQuery } from "react-query";
import { combineStringIds, fetcher } from "src/Utils/Helpers";
import { queryClient } from "src/Utils/ReactQueryConfig";
import { CHAT_HISTORY_REQUEST } from "../Types/RequestTypes";
import {
  CHAT_HISTORY_RESPONSE,
  CHAT_HISTORY_RESPONSE_ITEMS,
} from "../Types/ResponseTypes";

export const CHAT_HISTORY_INFINITE_QUERY_KEY = (participantIds: any) => [
  "chatHistory",
  participantIds,
];

export const chatHistory = async (data: CHAT_HISTORY_REQUEST, lt: string) => {
  const response: AxiosResponse<CHAT_HISTORY_RESPONSE> = await fetcher({
    url: `/chat/history?limit=20&firstParticipant=${
      data?.firstParticipantId
    }&secondParticipant=${data?.secondParticipantId}${lt && `&lt=${lt}`}`,
  });
  return response.data.data?.chats;
};
export const extractChatHistory = (
  pages: Array<CHAT_HISTORY_RESPONSE_ITEMS | any>
): Array<any> => {
  return pages?.reduce((a: any, b: any) => a.concat(b), []) ?? [];
};

export const getChatNextPageParam = (
  lastPage: Array<CHAT_HISTORY_RESPONSE_ITEMS>
) => {
  const lastChat = lastPage[lastPage?.length - 1];
  return lastChat?._id;
};
function useChatHistoryInfiniteQuery(data: CHAT_HISTORY_REQUEST) {
  const participantIds = combineStringIds(
    data.firstParticipantId,
    data.secondParticipantId
  );
  return useInfiniteQuery(
    CHAT_HISTORY_INFINITE_QUERY_KEY(participantIds),
    ({ pageParam }) => chatHistory(data, pageParam ?? ""),
    {
      refetchOnWindowFocus: false,
      enabled:
        data.firstParticipantId && data?.secondParticipantId ? true : false,
      getNextPageParam: getChatNextPageParam,
    }
  );
}

export default useChatHistoryInfiniteQuery;
