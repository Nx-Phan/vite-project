import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login-page">
      <LoginForm />

      <p className="auth-switch">
        Don’t have an account? <Link to="/create-account">Create one</Link>
      </p>
    </div>
  );
}

export default LoginPage;
