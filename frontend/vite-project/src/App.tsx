import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import StatCard from "./components/StatCard";
import CreateAccountPage from "./pages/CreateAccountPage";
import "./App.css";
import ProtectedRoute from "./ProtectedRoutes";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<StatCard />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
      </Routes>
    </div>
  );
}

export default App;
