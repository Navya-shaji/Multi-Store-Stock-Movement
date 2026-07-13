import { useState } from "react";
import { createProduct } from "../../services/api";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (val.trim() === "") {
      setSku("");
    } else {
      const generated = val.toUpperCase().split(" ").join("-");
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      setSku(`${generated}-${randomSuffix}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ name, sku });
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
          placeholder="Enter Product Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        <br /><br />
        <input
          type="text"
          placeholder="Unique SKU (Auto-generated)"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default CreateProduct;
