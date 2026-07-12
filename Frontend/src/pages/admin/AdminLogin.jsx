import { useState } from "react";
import { adminLogin } from "../../services/api";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChnage = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await adminLogin(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.User.role);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };
  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Enter email "
          value={formData.email}
          onChange={handleChnage}
        />
        <br />
        <input
          type="text"
          name="password"
          placeholder="Enter password "
          value={formData.password}
          onChange={handleChnage}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
