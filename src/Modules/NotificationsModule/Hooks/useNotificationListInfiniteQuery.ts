import { fetcher } from "../../../Utils/Helpers";
import { AxiosResponse } from "axios";
import { useInfiniteQuery, useQuery } from "react-query";
import {
  NOTIFICATION_LIST_DATA,
  NOTIFICATION_LIST_ITEM,
  NOTIFICATION_LIST_RESPONSE,
} from "../Types/ResponseTypes";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import router from "next/router";
import AuthService from "src/Modules/AuthModule/Services/AuthService";
export const GET_NOTIFICATION_LIST_KEY = ["notificationList"];
export const getNotificationList = async (
  page: number
): Promise<NOTIFICATION_LIST_DATA> => {
  const response: AxiosResponse<NOTIFICATION_LIST_RESPONSE> = await fetcher({
    url: `app/notification/notification-history?page=${page}&limit=10`,
  });
  return response.data.data;
};
export const extractNotificationList = (
  pages: Array<NOTIFICATION_LIST_DATA>
): Array<NOTIFICATION_LIST_ITEM> => {
  return (
    (pages || [])
      .map((_) => _?.list)
      ?.reduce((a: any, b: any) => a.concat(b), []) ?? []
  );
};
export const getNotificationListNextPageParam = (
  lastPage: NOTIFICATION_LIST_DATA
) => {
  const { count, limit, page } = lastPage || {};
  const totalPages = Math.ceil(count / limit);
  return totalPages > page ? page + 1 : undefined;
};
function useNotificationListInfiniteQuery() {
  const { loggedIn } = useAuthValue();
  return useInfiniteQuery(
    GET_NOTIFICATION_LIST_KEY,
    ({ pageParam = 1 }) =>
      getNotificationList(pageParam === null ? 1 : pageParam),
    {
      onError: (errorResponse) => {
        AuthService.resetAuthValue();
        sessionStorage.clear();
        router.push("/");
      },
      refetchOnWindowFocus: false,
      enabled: loggedIn ? true : false,
      getNextPageParam: getNotificationListNextPageParam,
    }
  );
}
export default useNotificationListInfiniteQuery;
