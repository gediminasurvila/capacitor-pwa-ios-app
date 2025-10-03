import { useState, useEffect } from "react";
import { PushNotifications } from "@capacitor/push-notifications";
import { Capacitor } from "@capacitor/core";

function PushNotificationFeature() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (Capacitor.isPluginAvailable("PushNotifications")) {
      initializePushNotifications();
    }
  }, []);

  const initializePushNotifications = async () => {
    // Request permission
    PushNotifications.addListener("registration", (token) => {
      setToken(token.value);
      setIsRegistered(true);
      setError("Registration successful!");
    });

    PushNotifications.addListener("registrationError", (error) => {
      setError(`Registration error: ${error.error}`);
    });

    PushNotifications.addListener(
      "pushNotificationReceived",
      (notification) => {
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now(),
            title: notification.title,
            body: notification.body,
            data: notification.data,
            received: new Date().toLocaleString(),
          },
        ]);
      }
    );

    PushNotifications.addListener(
      "pushNotificationActionPerformed",
      (notification) => {
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now(),
            title: `Tapped: ${notification.notification.title}`,
            body: notification.notification.body,
            data: notification.notification.data,
            received: new Date().toLocaleString(),
          },
        ]);
      }
    );
  };

  const registerNotifications = async () => {
    try {
      if (!Capacitor.isPluginAvailable("PushNotifications")) {
        throw new Error("Push notifications not available on this platform");
      }

      const permission = await PushNotifications.checkPermissions();

      if (permission.receive === "prompt") {
        const newPermission = await PushNotifications.requestPermissions();
        if (newPermission.receive !== "granted") {
          throw new Error("Permission not granted");
        }
      }

      await PushNotifications.register();
    } catch (err) {
      setError(err.message || "Failed to register for notifications");
    }
  };

  const sendLocalNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Test Notification", {
        body: "This is a test local notification",
        icon: "/pwa-192x192.png",
        badge: "/pwa-192x192.png",
      });
    } else if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Test Notification", {
            body: "This is a test local notification",
            icon: "/pwa-192x192.png",
          });
        }
      });
    } else {
      setError("Notifications not supported in this browser");
    }
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <div className="feature-card">
      <h3>🔔 Push Notifications</h3>

      <button
        className="btn"
        onClick={registerNotifications}
        disabled={isRegistered}
      >
        {isRegistered ? "Registered" : "Register for Push"}
      </button>

      <button className="btn" onClick={sendLocalNotification}>
        Send Local Notification
      </button>

      <button className="btn danger" onClick={clearNotifications}>
        Clear Notifications
      </button>

      {error && (
        <div
          className="result"
          style={{ color: isRegistered ? "#27ae60" : "#e74c3c" }}
        >
          {error}
        </div>
      )}

      {token && (
        <div className="result">Token: {token.substring(0, 50)}...</div>
      )}

      {notifications.length > 0 && (
        <div className="result">
          Recent Notifications:{"\n"}
          {notifications
            .slice(-3)
            .map((notif) => `${notif.received}: ${notif.title} - ${notif.body}`)
            .join("\n")}
        </div>
      )}
    </div>
  );
}

export default PushNotificationFeature;
