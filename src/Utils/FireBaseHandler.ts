import { FirebaseApp, initializeApp } from "firebase/app";
// import firestore from "@react-native-firebase/firestore";
import {
  getMessaging,
  Messaging,
  getToken,
  onMessage,
  NextFn,
  MessagePayload,
  Observer,
  isSupported,
} from "firebase/messaging";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

class FirebaseHandler {
  app: FirebaseApp | undefined;
  //   analytics: Analytics;
  messaging: Messaging | undefined;
  firestore: Firestore | undefined;
  auth: Auth | undefined;

  constructor() {
    const firebaseConfig = {
        apiKey: "AIzaSyB8HW_FxECsM08ICkndNfaxQ_YstrvSzwg",
        authDomain: "cachoo-d66ab.firebaseapp.com",
        projectId: "cachoo-d66ab",
        storageBucket: "cachoo-d66ab.appspot.com",
        messagingSenderId: "817109540335",
        appId: "1:817109540335:web:c5fe05b5ef9b6192b36a1a",
        measurementId: "G-5CE5DWS4RZ",
      };

    // this.analytics = getAnalytics(this.app);
    (async () => {
      this.app = initializeApp(firebaseConfig);
      const isMessagingSupported = await isSupported();
      if (isMessagingSupported) {
        this.messaging = getMessaging(this.app);
      }
      this.firestore = getFirestore(this.app);
      this.auth = getAuth(this.app);
    })();
  }

  getToken = () => {
    //@ts-ignore
    return getToken(this.messaging, {
      vapidKey: `BK4nGBz70CETqKoTxaSVxR6Z6hj8otwrvMtkc-rswVRpd8VezBKC1EnlcHRoH9C-EIRw4HASVET94l1jXEV8MFI`,
    });
  };

  onMessage = (
    nextOrObserver: NextFn<MessagePayload> | Observer<MessagePayload>
  ) => {
    //@ts-ignore
    return onMessage(this.messaging, nextOrObserver);
  };
}
export default new FirebaseHandler();
