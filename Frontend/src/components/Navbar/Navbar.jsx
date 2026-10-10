import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Sun,
  Moon,
  User,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

import "./Navbar.scss";

function Navbar({ mobileMenuOpen, onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("skills");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();
    if (!query) return;

    navigate(`/${searchType}?search=${encodeURIComponent(query)}`);
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="navbar">
      <button
        type="button"
        className="mobile-menu-button"
        aria-label={mobileMenuOpen ? "Chiudi menu" : "Apri menu"}
        aria-expanded={mobileMenuOpen}
        onClick={onMenuClick}
      >
        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <form className="search-container" onSubmit={handleSearch}>
        <Search size={20} aria-hidden="true" />

        <label className="sr-only" htmlFor="navbar-search-type">
          Cerca in
        </label>
        <select
          id="navbar-search-type"
          className="search-scope"
          value={searchType}
          onChange={(event) => setSearchType(event.target.value)}
        >
          <option value="skills">Skill</option>
          <option value="goals">Obiettivi</option>
        </select>

        <label className="sr-only" htmlFor="navbar-search">
          Testo da cercare
        </label>
        <input
          id="navbar-search"
          type="text"
          placeholder={
            searchType === "skills"
              ? "Cerca una skill..."
              : "Cerca un obiettivo..."
          }
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        {search && (
          <button
            type="button"
            className="clear-search"
            aria-label="Cancella ricerca"
            onClick={() => setSearch("")}
          >
            ×
          </button>
        )}
      </form>

      <div className="navbar-actions">
        <button
          type="button"
          className="theme-button"
          onClick={toggleTheme}
          title={theme === "light" ? "Attiva tema scuro" : "Attiva tema chiaro"}
          aria-label={
            theme === "light" ? "Attiva tema scuro" : "Attiva tema chiaro"
          }
        >
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="navbar-item">
          <button
            type="button"
            className="profile-button"
            onClick={() => setShowProfileMenu((visible) => !visible)}
            aria-expanded={showProfileMenu}
          >
            <div className="avatar">
              <User size={18} />
            </div>

            <span>{user?.username ?? "Utente"}</span>
            <ChevronDown size={16} />
          </button>

          {showProfileMenu && (
            <div className="dropdown profile-dropdown">
              <div className="profile-info">
                <div className="avatar large">
                  <User size={22} />
                </div>

                <div>
                  <strong>{user?.username ?? "Utente"}</strong>
                  <span>{user?.email ?? ""}</span>
                </div>
              </div>

              <div className="dropdown-divider" />

              <button
                type="button"
                className="dropdown-item logout"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
