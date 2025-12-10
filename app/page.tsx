"use client";
import { onMessageListener, requestForToken } from "@/lib/firebase";
import { saveFcmToken } from "@/services/notification";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  const enableNotifications = async () => {
    const result = await Notification.requestPermission();

    if (result === "granted") {
      const fcmToken = await requestForToken();
      if (fcmToken) {
        setToken(fcmToken);
        await saveFcmToken(fcmToken);
      }
    }
  };

  useEffect(() => {
    onMessageListener().then((payload: any) => {
      alert(`New Notification: ${payload.notification.title}`);
    });
  }, []);

  return (
    <main>
      <h2>Your FCM Token: {token}</h2>
      <button
        onClick={enableNotifications}
        className="p-3 bg-blue-600 text-white"
      >
        Enable Push Notifications
      </button>
    </main>
  );
}
