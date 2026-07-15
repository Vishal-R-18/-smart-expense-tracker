import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const nav = [
  { to: "/", label: "Dashboard", icon: "⊞" },
  { to: "/income", label: "Income", icon: "↑" },
  { to: "/expenses", label: "Expenses", icon: "↓" },
  { to: "/budget", label: "Budget", icon: "◎" },
  { to: "/insights", label: "AI Insights", icon: "✦" },
  { to: "/reports", label: "Reports", icon: "↗" },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">₹</span>
        <span className="logo-text">SpendWise</span>
      </div>

      {user && (
        <div className="sidebar-user">
          <div className="user-avatar">{user.name?.charAt(0).toUpperCase()}</div>
          <div className="user-info">
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
        </div>
      )}

      <nav className="sidebar-nav">
        {nav.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => `nav-item ${isActive ? "nav-item--active" : ""}`}
          >
            <span className="nav-icon">{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <button onClick={handleLogout} className="sidebar-logout">
        <span>⎋</span> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
