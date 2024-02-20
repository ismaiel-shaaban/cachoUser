import { isSupported } from "firebase/messaging";
import { useEffect, useMemo } from "react";
import useAuthValue from "src/Modules/AuthModule/Hooks/useAuthValue";
import SnackbarHandler from "src/Utils/SnackbarHandler";
import { useRouter } from "next/router";
import FireBaseHandler from "src/Utils/FireBaseHandler";

function useNotification() {
  const router = useRouter();
  useEffect(() => {
    let unsubscribe: any;
    (async () => {
      const isMessagingSupported = await isSupported();
      if (isMessagingSupported) {
        unsubscribe = FireBaseHandler.onMessage((notification: any) => {
          SnackbarHandler.notificationToast(notification, () => {
            router.push("/notifications");
          });
        });
      }
    })();

    return () => {
      unsubscribe;
    };
  }, [router]);
}
export default useNotification;
