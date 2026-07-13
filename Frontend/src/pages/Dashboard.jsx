import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./admin/AdminDashboard";
import ShopperDashboard from "./shopper/ShopperDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    const userName = localStorage.getItem("name");

    if (!token || !userRole) {
      localStorage.clear();
      navigate("/");
    } else {
      setRole(userRole);
      setName(userName || "User");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!role) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

  return (
    <div className="dashboard-layout">
      <nav className="nav-container">
        <a href="/dashboard" className="nav-logo" onClick={(e) => e.preventDefault()}>
          Multi-Store Stock Movement
        </a>
        <div className="nav-links">
          <span className="nav-user">
            Logged in as: <strong>{name}</strong> ({role})
          </span>
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </nav>

      {role.toLowerCase() === "admin" ? (
        <AdminDashboard />
      ) : (
        <ShopperDashboard />
      )}
    </div>
  );
}

export default Dashboard;
