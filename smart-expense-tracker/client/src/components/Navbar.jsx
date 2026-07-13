import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 text-white px-6 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">💰 Expense Tracker</Link>
      <div className="flex gap-4 items-center text-sm">
        {user ? (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/income">Income</Link>
            <Link to="/expenses">Expenses</Link>
            <Link to="/budget">Budget</Link>
            <Link to="/reports">Reports</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
