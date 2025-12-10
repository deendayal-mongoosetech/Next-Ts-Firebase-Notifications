importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDzoezPXN1BPb94UQaXPPRQn2uCB2DvVQk",
  authDomain: "rajexpress-1181b.firebaseapp.com",
  projectId: "rajexpress-1181b",
  storageBucket: "rajexpress-1181b.firebasestorage.app",
  messagingSenderId: "704316649784",
  appId: "1:704316649784:web:1c7fe278dae638ae0d11cd",
  //   measurementId: "G-QYEVJJDEEZ",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/icon.png",
  });
});

self.addEventListener("notificationclick", function (event) {
  const url = event.notification.data?.clickAction || "/";
  event.notification.close();
  clients.openWindow(url);
});
