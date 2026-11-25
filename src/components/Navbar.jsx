
import { NavLink } from "react-router-dom";

const navigationItems = [
  { path: "/", label: "Dashboard", icon: "⌂" },
  { path: "/history", label: "History", icon: "↕" },
  { path: "/add", label: "Add Transaction", icon: "+" },
  { path: "/settings", label: "Settings", icon: "⚙" },
];

function Navbar() {
  return (
    <aside className="sidebar">
      {/* Logo and brand */}
      <div className="brand">
        <span className="brand-icon">S</span>

        <div>
          <strong className="sepwall ">SepWall💰</strong>
          <small>Personal finance</small>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="navigation" aria-label="Main navigation">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer note */}
      <p className="sidebar-note">
        Your data stays safely in this browser.
      </p>
    </aside>
  );
}

export default Navbar;
