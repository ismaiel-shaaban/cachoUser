import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { fetcher, getUniqueId } from "./Helpers";
const firebaseConfig = {
  apiKey: "AIzaSyB8HW_FxECsM08ICkndNfaxQ_YstrvSzwg",
  authDomain: "cachoo-d66ab.firebaseapp.com",
  projectId: "cachoo-d66ab",
  storageBucket: "cachoo-d66ab.appspot.com",
  messagingSenderId: "817109540335",
  appId: "1:817109540335:web:c5fe05b5ef9b6192b36a1a",
  measurementId: "G-5CE5DWS4RZ",
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey:
      "BK4nGBz70CETqKoTxaSVxR6Z6hj8otwrvMtkc-rswVRpd8VezBKC1EnlcHRoH9C-EIRw4HASVET94l1jXEV8MFI",
  })
    .then((currentToken) => {
      if (currentToken) {
        fetcher({
          url: "app/auth/update-device-token",
          method: "PATCH",
          data: {
            deviceId: getUniqueId(),
            deviceType: "WEB",
            deviceToken: currentToken,
          },
        })
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });