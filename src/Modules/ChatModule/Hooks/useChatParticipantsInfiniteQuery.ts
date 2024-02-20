import { fetcher } from "../../../Utils/Helpers";
import { AxiosResponse } from "axios";
import { useInfiniteQuery, useQuery } from "react-query";
import {
  CHAT_PARTICIPANTS_LIST_ITEMS,
  CHAT_PARTICIPANTS_LIST_RESPONSE,
  CHAT_PARTICIPANT_DATA,
} from "../Types/ResponseTypes";
export const GET_PARTICIPANT_LIST_KEY = (searchValue: any) => [
  "chatParticipants",
  searchValue,
];
export const getParticipantsList = async (
  page: number,
  searchValue: any
): Promise<CHAT_PARTICIPANT_DATA> => {
  const response: AxiosResponse<CHAT_PARTICIPANTS_LIST_RESPONSE> =
    await fetcher({
      url: `/chat/participants?page=${page}&search=${searchValue}&limit=20`,
    });
  return response.data.data;
};
export const extractChatParticipantsList = (
  pages: Array<CHAT_PARTICIPANT_DATA>
): Array<CHAT_PARTICIPANTS_LIST_ITEMS> => {
  return (
    (pages || [])
      .map((_) => _?.chatParticipants)
      ?.reduce((a: any, b: any) => a.concat(b), []) ?? []
  );
};
export const getParticipantListNextPageParam = (
  lastPage: CHAT_PARTICIPANT_DATA
) => {
  const { count, limit, page } = lastPage || {};
  const totalPages = Math.ceil(count / limit);
  return totalPages > page ? page + 1 : undefined;
};
function useGetParticipantsListInfiniteQuery(searchValue: any) {
  return useInfiniteQuery(
    GET_PARTICIPANT_LIST_KEY(searchValue),
    ({ pageParam = 1 }) =>
      getParticipantsList(pageParam === null ? 1 : pageParam, searchValue),
    {
      refetchOnWindowFocus: false,
      getNextPageParam: getParticipantListNextPageParam,
    }
  );
}
export default useGetParticipantsListInfiniteQuery;
