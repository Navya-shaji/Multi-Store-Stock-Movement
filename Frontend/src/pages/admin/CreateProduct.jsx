import { useState } from "react";
import { createProduct } from "../../services/api";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
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
      const data = await createProduct(formData);
      console.log(data);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Product creation Failed");
    }
  };
  return (
    <div>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Product Name"
          onChange={handleChnage}
        />

        <input
          type="text"
          name="sku"
          placeholder="Enter Unique SKU"
          onChange={handleChnage}
        />
        <br />
        <button type="submit">CreateProduct</button>
      </form>
    </div>
  );
}

export default CreateProduct;
