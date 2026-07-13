import { useState, useEffect } from "react";
import { getAllProduct, getAllStore, createStock } from "../../services/api";
import { useNavigate } from "react-router-dom";

function CreateStock() {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    store: "",
    quantity: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const prodData = await getAllProduct();
        setProducts(prodData.Products || []);
        const storeData = await getAllStore();
        setStores(storeData.Stores || []);
      } catch (error) {
        console.log(error);
      }
    }
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createStock({
        product: formData.product,
        store: formData.store,
        quantity: Number(formData.quantity)
      });
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Stock Creation Failed");
    }
  };

  return (
    <div>
      <h1>Create Stock Entry</h1>
      <form onSubmit={handleSubmit}>
        <label>Product</label>
        <br />
        <select name="product" onChange={handleChange} required>
          <option value="">-- Select Product --</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.sku})
            </option>
          ))}
        </select>
        <br /><br />

        <label>Store</label>
        <br />
        <select name="store" onChange={handleChange} required>
          <option value="">-- Select Store --</option>
          {stores.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <br /><br />

        <input
          type="number"
          name="quantity"
          placeholder="Initial Quantity"
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Create Stock</button>
      </form>
    </div>
  );
}

export default CreateStock;
