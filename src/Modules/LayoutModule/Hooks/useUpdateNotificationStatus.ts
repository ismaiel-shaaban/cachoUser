import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { fetcher } from "../../../Utils/Helpers";
import useAuthValue, {
  getAuthValue,
  setAuthValue,
} from "src/Modules/AuthModule/Hooks/useAuthValue";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import { strings } from "src/Utils/Localization";

const updateNotificationStatus = async (): Promise<AxiosResponse<any>> => {
  return fetcher({
    url: `app/notification/notification-status`,
    method: "PATCH",
  });
};

function useUpdateNotificationStatus() {
  const { user, language } = useAuthValue();
  const notificationStatusMessage =
    language === "ar"
      ? strings.notification_status_updated
      : strings.notification_status_updated;
  return useMutation(updateNotificationStatus, {
    onSuccess: (responseData) => {
      const { status, data } = responseData;
      if (status === 200 || 201) {
        setAuthValue({
          ...getAuthValue(),
          user: {
            ...user,
            notification: user?.notification ? false : true,
          },
        });
      }
      SnackbarHandler.successToast(`${notificationStatusMessage}`);
    },
  });
}

export default useUpdateNotificationStatus;
