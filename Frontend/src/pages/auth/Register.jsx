import { useState } from "react";
import { registerUser } from "../../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");
    try {
      await registerUser(formData);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChnage}
            required
          />
        </div>
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
          Register
        </button>
      </form>
      <div style={{ marginTop: "16px", fontSize: "14px" }}>
        Already have an account? <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default Register;
