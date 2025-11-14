import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import Radar from "./components/Radar";
import "./App.css";

function App() {
  return (
    <div>
      {/* Navbar is always visible */}
      <Navbar />

      {/* Routes render pages based on the URL */}
      <Routes>
        <Route path="/" element={<Radar />} /> {/* Home / default page */}
        <Route path="/profile" element={<ProfilePage />} />
        {/* You can add more pages like /upload here */}
      </Routes>
    </div>
  );
}

export default App;
