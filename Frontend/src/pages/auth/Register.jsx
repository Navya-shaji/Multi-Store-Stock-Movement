import { useState } from "react";
import { registerUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChnage = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      navigate("/");
      console.log(data);
    } catch (error) {
      alert(error.response?.data?.message || "Registration Failed");
    }
  };
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter name "
          value={formData.name}
          onChange={handleChnage}
        />
        <br />
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
      
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
