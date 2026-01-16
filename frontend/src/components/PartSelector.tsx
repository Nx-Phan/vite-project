import React from "react";

interface Props {
  label: string;
  currentIndex: number;
  options: string[];
  onChange: (newIndex: number) => void;
}

export default function PartSelector({
  label,
  currentIndex,
  options,
  onChange,
}: Props) {
  const prev = () => {
    const newIndex = (currentIndex - 1 + options.length) % options.length;
    onChange(newIndex);
  };

  const next = () => {
    const newIndex = (currentIndex + 1) % options.length;
    onChange(newIndex);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <p>{label}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={prev}>←</button>

        <img
          src={options[currentIndex]}
          alt={label}
          style={{ width: 80, height: 80 }}
        />

        <button onClick={next}>→</button>
      </div>
    </div>
  );
}
