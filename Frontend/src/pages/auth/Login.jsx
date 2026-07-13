import { useState } from "react";
import { loginUser } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
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
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.User.role);
      localStorage.setItem("name", data.User.name || "");
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Shopper Login</h2>
      {error && <div className="alert alert-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Enter email"
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
          Login
        </button>
      </form>
      <div style={{ marginTop: "16px", fontSize: "14px" }}>
        Don't have an account? <Link to="/register">Register</Link>
      </div>
      <div style={{ marginTop: "12px", borderTop: "1px solid var(--border)", paddingTop: "12px", fontSize: "14px" }}>
        Are you an administrator? <Link to="/adminlogin">Admin Portal</Link>
      </div>
    </div>
  );
}

export default Login;
