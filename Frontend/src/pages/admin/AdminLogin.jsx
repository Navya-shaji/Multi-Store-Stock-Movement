import { useState } from "react";
import { adminLogin } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChnage = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await adminLogin(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.User.role);
      localStorage.setItem("name", data.User.name || "Admin");
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Admin Portal</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Admin Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter admin email"
            value={formData.email}
            onChange={handleChnage}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChnage}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "8px" }}>
          Access Dashboard
        </button>
      </form>
      <div style={{ marginTop: "16px", fontSize: "14px" }}>
        Not an administrator? <Link to="/">Shopper Login</Link>
      </div>
    </div>
  );
}

export default AdminLogin;
