import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { combineStringIds, fetcher } from "src/Utils/Helpers";
import { CHAT_HISTORY_RESPONSE } from "../Types/ResponseTypes";
import { CHAT_HISTORY_REQUEST } from "../Types/RequestTypes";

export const CHAT_HISTORY_QUERY_KEY = (participantIds: any) => [
  "chatHistoryListData",
  participantIds,
];

export const getChatHistory = async (data: CHAT_HISTORY_REQUEST) => {
  const response: AxiosResponse<CHAT_HISTORY_RESPONSE> = await fetcher({
    url: `/chat/history?limit=20&firstParticipant=${data?.firstParticipantId}&secondParticipant=${data?.secondParticipantId}`,
  });
  return response.data;
};
function useChatHistoryQuery(data: CHAT_HISTORY_REQUEST, cb?: any) {
  const participantIds = combineStringIds(
    data.firstParticipantId,
    data.secondParticipantId
  );
  return useQuery(
    CHAT_HISTORY_QUERY_KEY(participantIds),
    () => getChatHistory(data),
    {
      enabled:
        data.firstParticipantId && data?.secondParticipantId ? true : false,
      onSuccess: (response) => {
        if (response?.status === 200 || 201) {
          cb && cb(response);
        }
      },
    }
  );
}
export default useChatHistoryQuery;
