import { useState, useEffect } from "react";
import { Preferences } from "@capacitor/preferences";

function StorageFeature() {
  const [key, setKey] = useState("test-key");
  const [value, setValue] = useState("test-value");
  const [storedValue, setStoredValue] = useState("");
  const [allKeys, setAllKeys] = useState([]);

  const setItem = async () => {
    try {
      await Preferences.set({
        key: key,
        value: value,
      });
      await loadAllKeys();
      setValue("");
    } catch (error) {
      console.error("Error setting item:", error);
    }
  };

  const getItem = async () => {
    try {
      const { value } = await Preferences.get({ key });
      setStoredValue(value || "Not found");
    } catch (error) {
      console.error("Error getting item:", error);
      setStoredValue("Error retrieving value");
    }
  };

  const removeItem = async () => {
    try {
      await Preferences.remove({ key });
      setStoredValue("");
      await loadAllKeys();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const clearAll = async () => {
    try {
      await Preferences.clear();
      setStoredValue("");
      setAllKeys([]);
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  };

  const loadAllKeys = async () => {
    try {
      const { keys } = await Preferences.keys();
      setAllKeys(keys);
    } catch (error) {
      console.error("Error loading keys:", error);
    }
  };

  useEffect(() => {
    loadAllKeys();
  }, []);

  return (
    <div className="feature-card">
      <h3>💾 Storage</h3>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "0.5rem",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        />
      </div>

      <button className="btn" onClick={setItem}>
        Set Item
      </button>

      <button className="btn" onClick={getItem}>
        Get Item
      </button>

      <button className="btn danger" onClick={removeItem}>
        Remove Item
      </button>

      <button className="btn danger" onClick={clearAll}>
        Clear All
      </button>

      {storedValue && <div className="result">Value: {storedValue}</div>}

      {allKeys.length > 0 && (
        <div className="result">All Keys: {allKeys.join(", ")}</div>
      )}
    </div>
  );
}

export default StorageFeature;
