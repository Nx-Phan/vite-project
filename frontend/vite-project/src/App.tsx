import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import StatCard from "./components/StatCard";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<StatCard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
