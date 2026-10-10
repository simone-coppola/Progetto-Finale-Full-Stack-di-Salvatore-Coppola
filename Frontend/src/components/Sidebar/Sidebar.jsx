import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Brain,
  Target,
  TrendingUp,
  Menu,
  ChevronsLeft,
} from "lucide-react";
import { useState } from "react";
import "./Sidebar.scss";

function Sidebar({ mobileOpen, onClose }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Skills",
      path: "/skills",
      icon: Brain,
    },
    {
      name: "Obiettivi",
      path: "/goals",
      icon: Target,
    },
    {
      name: "Progressi",
      path: "/progress",
      icon: TrendingUp,
    },
  ];

  const bottomItems = [];

  return (
    <aside
      className={`sidebar ${collapsed ? "collapsed" : ""} ${
        mobileOpen ? "mobile-open" : ""
      }`}
    >
      {/* Header */}
      <div className="sidebar-header">
        {!collapsed && <h2>SkillTrack</h2>}

        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Apri/chiudi sidebar"
        >
          {collapsed ? <Menu size={22} /> : <ChevronsLeft size={22} />}
        </button>
      </div>

      {/* Menu principale */}
      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} />

              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Menu inferiore */}
      <div className="sidebar-bottom">
        {bottomItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={20} />

              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
