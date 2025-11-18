import Radar from "./Radar";
import "./StatCard.css";

function StatCard() {
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
          <p className="total-score">76</p>
          <p className="grade">B</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <Radar />
      </div>
    </div>
  );
}

export default StatCard;
