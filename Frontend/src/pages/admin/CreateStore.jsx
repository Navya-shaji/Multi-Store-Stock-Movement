import { useState } from "react";
import {  createStore } from "../../services/api";
import { useNavigate } from "react-router-dom";

function CreateStore() {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
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
      const data = await createStore(formData);
      console.log(data);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Store creation Failed");
    }
  };
  return (
    <div>
      <h1>Create Store</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter store Name"
          onChange={handleChnage}
        />

    
        <button type="submit">CreateStore</button>
      </form>
    </div>
  );
}

export default CreateStore;
