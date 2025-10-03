import { useState, useEffect } from "react";

function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className={`status ${isOnline ? "online" : "offline"}`}>
      <div className="status-dot"></div>
      <span>{isOnline ? "Online" : "Offline"} - PWA Ready</span>
    </div>
  );
}

export default NetworkStatus;
