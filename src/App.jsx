import { useState, useEffect } from "react";
import { Capacitor } from "@capacitor/core";
import CameraFeature from "./components/CameraFeature";
import StorageFeature from "./components/StorageFeature";
import GeolocationFeature from "./components/GeolocationFeature";
import PushNotificationFeature from "./components/PushNotificationFeature";
import NetworkStatus from "./components/NetworkStatus";

function App() {
  const [platform, setPlatform] = useState("");

  useEffect(() => {
    setPlatform(Capacitor.getPlatform());
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>Capacitor PWA App</h1>
          <p
            style={{
              textAlign: "center",
              color: "#7f8c8d",
              marginTop: "0.5rem",
            }}
          >
            Platform: {platform} |{" "}
            {Capacitor.isNativePlatform() ? "Native" : "Web"}
          </p>
        </div>
      </header>

      <main className="container">
        <NetworkStatus />

        <div className="features-grid">
          <CameraFeature />
          <StorageFeature />
          <GeolocationFeature />
          <PushNotificationFeature />
        </div>
      </main>
    </div>
  );
}

export default App;
