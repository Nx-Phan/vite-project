import { useState } from "react";
import { hairOptions, eyesOptions, mouthOptions } from "../data/avatarParts";

export default function ProfileCustomizer() {
  const [hair, setHair] = useState(0);
  const [eyes, setEyes] = useState(0);
  const [mouth, setMouth] = useState(0);

  const cycle = (
    index: number,
    set: (n: number) => void,
    arr: string[],
    dir: 1 | -1
  ) => {
    const newIndex = (index + dir + arr.length) % arr.length;
    set(newIndex);
  };

  return (
    <div
      style={{
        maxWidth: 350,
        margin: "0 auto",
        padding: 20,
        border: "2px solid #00c8ff",
        borderRadius: 16,
        background: "#001b24",
        color: "white",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>Avatar Customizer</h2>

      {/* Avatar Preview */}
      <div
        style={{
          width: 180,
          height: 180,
          position: "relative",
          margin: "0 auto 30px",
        }}
      >
        <img src={hairOptions[hair]} style={layerStyle} />
        <img src={eyesOptions[eyes]} style={layerStyle} />
        <img src={mouthOptions[mouth]} style={layerStyle} />
      </div>

      {/* Selectors — compact row layout */}
      <SelectorRow
        label="Hair"
        img={hairOptions[hair]}
        onLeft={() => cycle(hair, setHair, hairOptions, -1)}
        onRight={() => cycle(hair, setHair, hairOptions, +1)}
      />
      <SelectorRow
        label="Eyes"
        img={eyesOptions[eyes]}
        onLeft={() => cycle(eyes, setEyes, eyesOptions, -1)}
        onRight={() => cycle(eyes, setEyes, eyesOptions, +1)}
      />
      <SelectorRow
        label="Mouth"
        img={mouthOptions[mouth]}
        onLeft={() => cycle(mouth, setMouth, mouthOptions, -1)}
        onRight={() => cycle(mouth, setMouth, mouthOptions, +1)}
      />
    </div>
  );
}

const layerStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  objectFit: "contain",
};

// A small inline row component for part selection
function SelectorRow({
  label,
  img,
  onLeft,
  onRight,
}: {
  label: string;
  img: string;
  onLeft: () => void;
  onRight: () => void;
}) {
  return (
    <div
      style={{
        margin: "12px 0",
        padding: "6px 10px",
        background: "#002833",
        borderRadius: 10,
      }}
    >
      <p style={{ marginBottom: 6 }}>{label}</p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button style={arrowBtn} onClick={onLeft}>
          ←
        </button>

        <img src={img} style={{ width: 55 }} />

        <button style={arrowBtn} onClick={onRight}>
          →
        </button>
      </div>
    </div>
  );
}

const arrowBtn: React.CSSProperties = {
  padding: "4px 10px",
  borderRadius: 6,
  border: "none",
  background: "#00c8ff",
  cursor: "pointer",
  fontSize: 16,
  color: "black",
};
