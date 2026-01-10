import { useState } from "react";

function CreateAccountForm() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = email.includes("@") && email.includes(".");
  const passwordsMatch = password === confirmPassword;

  const canSubmit =
    username.length >= 3 &&
    isEmailValid &&
    password.length >= 8 &&
    passwordsMatch;

  const getPasswordStrength = (password: string) => {
    if (password.length < 8) return "Weak";
    if (/[A-Z]/.test(password) && /\d/.test(password)) return "Strong";
    return "Medium";
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordsMatch) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/createAccount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Account creation failed");
      }
    } catch {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreateAccount}>
      <h2>Create Account</h2>

      {error && <p className="error-text">{error}</p>}

      {!passwordsMatch && confirmPassword && (
        <p className="error-text">Passwords do not match</p>
      )}

      {password && (
        <p
          className={`strength ${getPasswordStrength(password).toLowerCase()}`}
        >
          {getPasswordStrength(password)}
        </p>
      )}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button disabled={!canSubmit || loading}>
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}

export default CreateAccountForm;
