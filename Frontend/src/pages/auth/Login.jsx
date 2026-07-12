import { useState } from "react";
import { loginUser } from "../../services/api";

function Login() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      console.log(data)

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

export default Login;
