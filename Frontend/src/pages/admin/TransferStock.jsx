import { useState, useEffect } from "react";
import { getAllProduct, getAllStore, createTransfer } from "../../services/api";
import { useNavigate } from "react-router-dom";

function TransferStock() {
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    fromStore: "",
    toStore: "",
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
      await createTransfer({
        product: formData.product,
        fromStore: formData.fromStore,
        toStore: formData.toStore,
        quantity: Number(formData.quantity)
      });
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Transfer Failed");
    }
  };

  return (
    <div>
      <h1>Transfer Stock</h1>
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

        <label>From Store</label>
        <br />
        <select name="fromStore" onChange={handleChange} required>
          <option value="">-- Select Source Store --</option>
          {stores.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
        <br /><br />

        <label>To Store</label>
        <br />
        <select name="toStore" onChange={handleChange} required>
          <option value="">-- Select Destination Store --</option>
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
          placeholder="Quantity to Transfer"
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Transfer Stock</button>
      </form>
    </div>
  );
}

export default TransferStock;
