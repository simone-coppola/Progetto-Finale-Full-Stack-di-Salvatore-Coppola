import "./Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Sun, Moon } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await login(name, password);
      navigate("/");
    } catch (error) {
      setError(error.message || "Errore durante il login");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="theme-button"
          onClick={toggleTheme}
          title={theme === "light" ? "Attiva tema scuro" : "Attiva tema chiaro"}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="welcome-group">
          <h1>Bentornato!</h1>
          <p>Inserisci le tue credenziali per accedere.</p>
        </div>

        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}

        <div className="input-group">
          <label htmlFor="login-email">Username</label>

          <div className="input-field">
            <Mail className="input-icon" size={20} aria-hidden="true" />

            <input
              id="login-email"
              type="text"
              placeholder="Il tuo Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="username"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="login-password">Password</label>

          <div className="input-field">
            <Lock className="input-icon" size={20} aria-hidden="true" />

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="La tua password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={
                showPassword ? "Nascondi password" : "Mostra password"
              }
            >
              {showPassword ? (
                <EyeOff size={20} aria-hidden="true" />
              ) : (
                <Eye size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <button
          type="button"
          className="forgot-password"
          onClick={() => navigate("/forgot-password")}
        >
          Password dimenticata?
        </button>

        <button type="submit" className="login-button">
          Accedi
        </button>

        <div className="divider" aria-hidden="true">
          <span>oppure</span>
        </div>

        <div className="register-link">
          <span>Non hai un account?</span>

          <button
            type="button"
            className="register-button"
            onClick={() => navigate("/register")}
          >
            Registrati
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
