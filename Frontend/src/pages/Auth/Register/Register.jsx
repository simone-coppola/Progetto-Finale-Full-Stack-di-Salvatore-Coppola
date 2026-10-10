import "./Register.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Sun, Moon } from "lucide-react";
import { registerApi } from "../../../services/api";
import { useTheme } from "../../../context/ThemeContext";

function Register() {
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }

    setError("");

    try {
      await registerApi(name, email, password);

      navigate("/login", { replace: true });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <button
          type="button"
          className="theme-button"
          onClick={toggleTheme}
          title={theme === "light" ? "Attiva tema scuro" : "Attiva tema chiaro"}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="welcome-group">
          <h1>Crea il tuo account</h1>
          <p>Compila i campi per creare il tuo account.</p>
        </div>

        <div className="input-group">
          <label htmlFor="register-name">Nome</label>

          <div className="input-field">
            <User className="input-icon" size={20} aria-hidden="true" />

            <input
              id="register-name"
              type="text"
              placeholder="Il tuo nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="register-email">Email</label>

          <div className="input-field">
            <Mail className="input-icon" size={20} aria-hidden="true" />

            <input
              id="register-email"
              type="email"
              placeholder="La tua Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="register-password">Password</label>

          <div className="input-field">
            <Lock className="input-icon" size={20} aria-hidden="true" />

            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              placeholder="Crea una password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              autoComplete="new-password"
              minLength={8}
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

        <div className="input-group">
          <label htmlFor="register-confirm-password">Conferma Password</label>

          <div className="input-field">
            <Lock className="input-icon" size={20} aria-hidden="true" />

            <input
              id="register-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Ripeti la password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              autoComplete="new-password"
              minLength={8}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword((current) => !current)}
              aria-label={
                showConfirmPassword
                  ? "Nascondi conferma password"
                  : "Mostra conferma password"
              }
            >
              {showConfirmPassword ? (
                <EyeOff size={20} aria-hidden="true" />
              ) : (
                <Eye size={20} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="register-button">
          Registrati
        </button>

        <div className="divider" aria-hidden="true">
          <span>oppure</span>
        </div>

        <div className="login-link">
          <span>Hai già un account?</span>

          <button
            type="button"
            className="login-button"
            onClick={() => navigate("/login")}
          >
            Accedi
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
