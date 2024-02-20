importScripts(
  "https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js"
);
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object

self.addEventListener("notificationclick", function (event) {
  let url = "/notifications";
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

firebase.initializeApp({
  apiKey: "AIzaSyB8HW_FxECsM08ICkndNfaxQ_YstrvSzwg",
  authDomain: "cachoo-d66ab.firebaseapp.com",
  projectId: "cachoo-d66ab",
  storageBucket: "cachoo-d66ab.appspot.com",
  messagingSenderId: "817109540335",
  appId: "1:817109540335:web:c5fe05b5ef9b6192b36a1a",
  measurementId: "G-5CE5DWS4RZ",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function () {
  return self.registration.showNotification(notificationBackGround);
});
