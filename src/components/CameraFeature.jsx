import { useState } from "react";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Capacitor } from "@capacitor/core";

function CameraFeature() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const takePicture = async () => {
    setLoading(true);
    setError("");

    try {
      // Check if camera is available
      if (!Capacitor.isPluginAvailable("Camera")) {
        throw new Error("Camera not available on this platform");
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      setImage(image.dataUrl);
    } catch (err) {
      setError(err.message || "Failed to take picture");
    } finally {
      setLoading(false);
    }
  };

  const selectFromGallery = async () => {
    setLoading(true);
    setError("");

    try {
      if (!Capacitor.isPluginAvailable("Camera")) {
        throw new Error("Camera not available on this platform");
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });

      setImage(image.dataUrl);
    } catch (err) {
      setError(err.message || "Failed to select image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-card">
      <h3>📷 Camera</h3>

      <button className="btn" onClick={takePicture} disabled={loading}>
        {loading ? "Taking Picture..." : "Take Picture"}
      </button>

      <button className="btn" onClick={selectFromGallery} disabled={loading}>
        {loading ? "Selecting..." : "Select from Gallery"}
      </button>

      {error && (
        <div className="result" style={{ color: "#e74c3c" }}>
          Error: {error}
        </div>
      )}

      {image && (
        <div style={{ marginTop: "1rem" }}>
          <img
            src={image}
            alt="Captured"
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default CameraFeature;
