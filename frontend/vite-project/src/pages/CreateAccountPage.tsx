import { Link } from "react-router-dom";
import CreateAccountForm from "../components/CreateAccountForm";

function CreateAccount() {
  return (
    <div className="Account-page">
      <CreateAccountForm />

      <p className="auth-switch">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default CreateAccount;
