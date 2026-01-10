import LoginForm from "../components/LoginForm";
import CreateAccountForm from "../components/CreateAccountForm";

function LoginPage() {
  return (
    <div className="login-page">
      <LoginForm />
      <CreateAccountForm />
    </div>
  );
}

export default LoginPage;
