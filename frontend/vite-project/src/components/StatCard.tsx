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

type Avatar = {
  hair: number;
  eye: number;
  mouth: number;
};

function StatCard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState<Avatar | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/stats/1").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stats");
        return res.json();
      }),
      fetch("http://localhost:5000/api/avatar/1").then((res) => {
        if (!res.ok) throw new Error("Failed to fetch avatar");
        return res.json();
      }),
    ])
      .then(([statsData, avatarData]) => {
        setStats(statsData);
        setAvatar(avatarData);
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

  if (!stats || !avatar) {
    return <div className="stat-card">No stats available</div>;
  }

  return (
    <div className="stat-card">
      {/* LEFT PANEL */}
      <div className="left-panel">
        <h2 className="player-name">ISAGI</h2>

        <div className="avatar-box">
          <img src={`/avatars/hair/${avatar.hair}.png`} />
          <img src={`/avatars/eyes/${avatar.eye}.png`} />
          <img src={`/avatars/mouth/${avatar.mouth}.png`} />
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
