import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface StatRadarProps {
  label?: string;
  scores: number[]; // e.g. [50, 70, 100, 34, 47]
}

export default function StatRadar({
  label = "Player",
  scores,
}: StatRadarProps) {
  const data = {
    labels: ["Attack", "Defense", "Setting", "Serve", "Block"],
    datasets: [
      {
        label: label,
        data: scores,
        backgroundColor: "rgba(255,255,255,0.2)",
        borderColor: "#f5ebd0",
        pointStyle: "rect",
        pointBackgroundColor: "#f5ebd0",
        pointBorderColor: "#000000ff",
        pointHoverBackgroundColor: "#f5ebd0",
        pointHoverBorderColor: "#000000ff",
        pointHoverRadius: 8,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: { radius: 10 },
    },
    scales: {
      r: {
        angleLines: { color: "#f5ebd0" },
        grid: { color: "#f5ebd0" },
        pointLabels: {
          color: "#f5ebd0",
          font: { size: 20 },
        },
        suggestedMin: 0,
        suggestedMax: 120,
        ticks: { display: false },
      },
    },
    plugins: {
      legend: { labels: { color: "#f5ebd0" } },
    },
  };

  return (
    <div
      style={{
        height: 400,
        width: 400,
        border: "2px solid #f5ebd0",
        borderRadius: 20,
        padding: 16,
      }}
    >
      <Radar data={data} options={options} />
    </div>
  );
}
