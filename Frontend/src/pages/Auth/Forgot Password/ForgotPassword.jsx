import { useState } from "react";
import { Mail, ArrowLeft, Send, Sun, Moon } from "lucide-react";
import "./ForgotPassword.scss";
import { useTheme } from "../../../context/ThemeContext";

function ForgotPassword() {
  const { theme, toggleTheme } = useTheme();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Inserisci la tua email.");
      return;
    }

    setMessage(
      "Se l'email è associata a un account, riceverai un link per reimpostare la password."
    );
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
                <button
          className="theme-button"
          onClick={toggleTheme}
          title={theme === "light" ? "Attiva tema scuro" : "Attiva tema chiaro"}
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="forgot-password-header">
          <h1>Password dimenticata?</h1>

          <p>
            Inserisci la tua email e ti invieremo un link
            per reimpostare la password.
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="email">Email</label>

            <div className="input-mail">
              <Mail className="input-icon" />

              <input
                id="email"
                type="email"
                placeholder="La tua Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {error && (
            <p className="form-message error">
              {error}
            </p>
          )}

          {message && (
            <p className="form-message success">
              {message}
            </p>
          )}

          <button type="submit" className="submit-button">
            <Send size={18} />
            Invia link
          </button>

        </form>

        <button
          type="button"
          className="back-button"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={18} />
          Torna al login
        </button>

      </div>
    </div>
  );
}

export default ForgotPassword;
