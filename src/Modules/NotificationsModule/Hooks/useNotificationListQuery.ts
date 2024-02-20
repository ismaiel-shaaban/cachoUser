import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { fetcher } from "src/Utils/Helpers";
import { NOTIFICATION_LIST_RESPONSE } from "../Types/ResponseTypes";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import router from "next/router";
import AuthService from "src/Modules/AuthModule/Services/AuthService";

export const NOTIFICATION_HISTORY_QUERY_KEY = ["notificationHistoryQuery"];

export const getNotification = async (page: any) => {
  const response: AxiosResponse<NOTIFICATION_LIST_RESPONSE> = await fetcher({
    url: `app/notification/notification-history?page=${page}&limit=10`,
  });
  return response.data;
};
function useNotificationListQuery() {
  const { loggedIn } = useAuthValue();
  return useQuery(NOTIFICATION_HISTORY_QUERY_KEY, () => getNotification(1), {
    onError: (errorResponse) => {
      AuthService.resetAuthValue();
      sessionStorage.clear();
      router.push("/");
    },
    enabled: loggedIn ? true : false,
  });
}
export default useNotificationListQuery;
