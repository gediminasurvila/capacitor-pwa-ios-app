import { useState } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { Capacitor } from "@capacitor/core";

function GeolocationFeature() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [watchId, setWatchId] = useState(null);

  const getCurrentPosition = async () => {
    setLoading(true);
    setError("");

    try {
      if (!Capacitor.isPluginAvailable("Geolocation")) {
        throw new Error("Geolocation not available on this platform");
      }

      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
      });

      setLocation({
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        accuracy: coordinates.coords.accuracy,
        timestamp: new Date(coordinates.timestamp).toLocaleString(),
      });
    } catch (err) {
      setError(err.message || "Failed to get location");
    } finally {
      setLoading(false);
    }
  };

  const watchPosition = async () => {
    if (watchId) {
      await Geolocation.clearWatch({ id: watchId });
      setWatchId(null);
      return;
    }

    try {
      if (!Capacitor.isPluginAvailable("Geolocation")) {
        throw new Error("Geolocation not available on this platform");
      }

      const id = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 10000,
        },
        (position, err) => {
          if (err) {
            setError(err.message);
            return;
          }

          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date(position.timestamp).toLocaleString(),
          });
        }
      );

      setWatchId(id);
    } catch (err) {
      setError(err.message || "Failed to watch location");
    }
  };

  const checkPermissions = async () => {
    try {
      const permissions = await Geolocation.checkPermissions();
      setError(`Location permission: ${permissions.location}`);
    } catch (err) {
      setError(err.message || "Failed to check permissions");
    }
  };

  const requestPermissions = async () => {
    try {
      const permissions = await Geolocation.requestPermissions();
      setError(`Location permission granted: ${permissions.location}`);
    } catch (err) {
      setError(err.message || "Failed to request permissions");
    }
  };

  return (
    <div className="feature-card">
      <h3>📍 Geolocation</h3>

      <button className="btn" onClick={getCurrentPosition} disabled={loading}>
        {loading ? "Getting Location..." : "Get Current Position"}
      </button>

      <button
        className={`btn ${watchId ? "danger" : ""}`}
        onClick={watchPosition}
      >
        {watchId ? "Stop Watching" : "Watch Position"}
      </button>

      <button className="btn" onClick={checkPermissions}>
        Check Permissions
      </button>

      <button className="btn" onClick={requestPermissions}>
        Request Permissions
      </button>

      {error && (
        <div className="result" style={{ color: "#e74c3c" }}>
          {error}
        </div>
      )}

      {location && (
        <div className="result">
          Latitude: {location.latitude.toFixed(6)}
          {"\n"}
          Longitude: {location.longitude.toFixed(6)}
          {"\n"}
          Accuracy: {location.accuracy}m{"\n"}
          Time: {location.timestamp}
        </div>
      )}
    </div>
  );
}

export default GeolocationFeature;
