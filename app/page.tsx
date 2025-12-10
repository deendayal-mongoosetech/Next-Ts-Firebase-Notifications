"use client";
import { onMessageListener, requestForToken } from "@/lib/firebase";
import { saveFcmToken } from "@/services/notification";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  const enableNotifications = async () => {
    const permission = Notification.permission;
    if (permission === "granted") {
      const fcmToken = await requestForToken();
      if (fcmToken) {
        setToken(fcmToken);
        await saveFcmToken(fcmToken);
      }
      return;
    }

    if (permission === "denied") {
      handleDeniedPermission();
      return;
    }

    // permission === "default" → Ask the user
    const result = await Notification.requestPermission();

    if (result === "granted") {
      const fcmToken = await requestForToken();
      if (fcmToken) {
        setToken(fcmToken);
        await saveFcmToken(fcmToken);
      }
    } else {
      handleDeniedPermission();
    }
  };

  const handleDeniedPermission = () => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);

    if (isIOS) {
      alert(
        "Notifications are blocked.\n\nTo enable:\nSettings → Safari → Notifications → Allow"
      );
    } else if (isAndroid) {
      alert(
        "Notifications are blocked.\n\nTo enable:\nChrome → Settings → Site Settings → Notifications → Allow"
      );
    } else {
      alert("Please enable notifications in your browser settings.");
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
