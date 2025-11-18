import { useState } from "react";
import ProfileCustomizer from "../components/ProfileCustomizer";

export default function ProfilePage() {
  const [customizing, setCustomizing] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <h1>My Profile</h1>

      <button
        onClick={() => setCustomizing(!customizing)}
        style={{
          padding: "10px 20px",
          borderRadius: 8,
          cursor: "pointer",
          marginBottom: 20,
        }}
      >
        {customizing ? "Close Customizer" : "Customize Avatar"}
      </button>

      {customizing && <ProfileCustomizer />}
    </div>
  );
}
