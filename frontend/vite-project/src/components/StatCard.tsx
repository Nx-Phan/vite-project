import { useEffect, useState } from "react";
import Radar from "./Radar";
import "./StatCard.css";

type Stats = {
  attack: number;
  defense: number;
  setting: number;
  serve: number;
  block: number;
};

function StatCard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/home/1")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch stats");
        }
        return res.json();
      })
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="stat-card">Loading...</div>;
  }

  if (!stats) {
    return <div className="stat-card">No stats available</div>;
  }

  return (
    <div className="stat-card">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <h2 className="player-name">ISAGI</h2>

        <div className="avatar-box">
          <img src="/mock-avatar.png" alt="Avatar" />
        </div>

        <div className="rating-box">
          <p className="total-label">TOTAL</p>
          <p className="total-score">
            {Math.round(
              (stats.attack +
                stats.defense +
                stats.setting +
                stats.serve +
                stats.block) /
                5
            )}
          </p>
          <p className="grade">B</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <Radar stats={stats} />
      </div>
    </div>
  );
}

export default StatCard;
