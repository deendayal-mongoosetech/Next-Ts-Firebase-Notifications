import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDzoezPXN1BPb94UQaXPPRQn2uCB2DvVQk",
  authDomain: "rajexpress-1181b.firebaseapp.com",
  projectId: "rajexpress-1181b",
  storageBucket: "rajexpress-1181b.firebasestorage.app",
  messagingSenderId: "704316649784",
  appId: "1:704316649784:web:1c7fe278dae638ae0d11cd",
};

const app = initializeApp(firebaseConfig);

export const messaging =
  typeof window !== "undefined" ? getMessaging(app) : null;

export const requestForToken = async () => {
  if (!messaging) return null;
  try {
    console.log(messaging, "messaging");
    const currentToken = await getToken(messaging, {
      vapidKey:
        "BIrDEiHjbcg3XjzIqQJIjiensRd3OVIyh7Teg5HQmbxeQx6RxKDTjW0PbOV-iY87fW0A3gPP36vluMWdGJcVgxA",
    });
    console.log(currentToken, "current token");

    return currentToken;
  } catch (error) {
    console.error("FCM token error:", error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return;
    onMessage(messaging, (payload) => resolve(payload));
  });
