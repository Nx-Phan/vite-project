import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar as RadarChart } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type Stats = {
  attack: number;
  defense: number;
  setting: number;
  serve: number;
  block: number;
};

type RadarProps = {
  stats: Stats;
};

export default function Radar({ stats }: RadarProps) {
  const data = {
    labels: ["Attack", "Defense", "Setting", "Serve", "Block"],
    datasets: [
      {
        label: "Player Stats",
        data: [
          stats.attack,
          stats.defense,
          stats.setting,
          stats.serve,
          stats.block,
        ],
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
      legend: {
        labels: { color: "#f5ebd0" },
      },
    },
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        border: "2px solid #f5ebd0",
        borderRadius: 20,
        padding: 16,
      }}
    >
      <RadarChart data={data} options={options} />
    </div>
  );
}
