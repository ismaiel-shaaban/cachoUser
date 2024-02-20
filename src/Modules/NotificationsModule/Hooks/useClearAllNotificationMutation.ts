import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { fetcher } from "../../../Utils/Helpers";
import { GET_NOTIFICATION_LIST_KEY } from "./useNotificationListInfiniteQuery";
import { NOTIFICATION_HISTORY_QUERY_KEY } from "./useNotificationListQuery";
import { queryClient } from "src/Utils/ReactQueryConfig";

const clearNotification = async (): Promise<AxiosResponse<any>> => {
  return fetcher({
    url: `app/notification/clear-notification`,
    method: "DELETE",
  });
};

function useClearAllNotificationMutation() {
  return useMutation(clearNotification, {
    onSuccess: (responseData) => {
      const { status } = responseData;
      if (status === 200 || 201) {
        queryClient.refetchQueries(GET_NOTIFICATION_LIST_KEY);
        queryClient.refetchQueries(NOTIFICATION_HISTORY_QUERY_KEY);
      }
    },
  });
}

export default useClearAllNotificationMutation;
