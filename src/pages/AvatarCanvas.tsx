import React, { useEffect, useRef } from "react";

interface Props {
  image: string | null;
  zoom: number;
  name: string;
}

const AvatarCanvas: React.FC<Props> = ({ image, zoom, name }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const size = 400;

    canvas.width = size;
    canvas.height = size;

    // background
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, size, size);

    if (image) {
      const img = new Image();
      img.src = image;

      img.onload = () => {
        const w = img.width * zoom;
        const h = img.height * zoom;

        ctx.drawImage(img, size / 2 - w / 2, size / 2 - h / 2, w, h);

        // neon outline
        ctx.strokeStyle = "#00e4ff";
        ctx.lineWidth = 6;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#00e4ff";
        ctx.strokeRect(20, 20, size - 40, size - 40);
      };
    }

    // name bar
    ctx.fillStyle = "#00ccff";
    ctx.fillRect(0, size - 60, size, 60);

    ctx.fillStyle = "white";
    ctx.font = "bold 28px Kanit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(name.toUpperCase(), size / 2, size - 20);
  }, [image, zoom, name]);

  return <canvas ref={canvasRef} style={{ borderRadius: "12px" }} />;
};

export default AvatarCanvas;
