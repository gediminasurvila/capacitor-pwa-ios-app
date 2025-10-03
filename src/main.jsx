import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Capacitor
import { Capacitor } from "@capacitor/core";

// PWA Service Worker
if ("serviceWorker" in navigator && !Capacitor.isNativePlatform()) {
  import("virtual:pwa-register").then(({ registerSW }) => {
    registerSW({
      onNeedRefresh() {
        if (confirm("New content available. Reload?")) {
          window.location.reload();
        }
      },
      onOfflineReady() {
        console.log("App ready to work offline");
      },
    });
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
