import { useState, useEffect } from "react";
import { getAllStock, editStock } from "../../services/api";
import { useNavigate } from "react-router-dom";

function AdjustStock() {
  const [stocks, setStocks] = useState([]);
  const [formData, setFormData] = useState({ stockId: "", change: "" });
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStocks() {
      try {
        const data = await getAllStock();
        setStocks(data.Stocks || []);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStocks();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editStock({
        stockId: formData.stockId,
        change: Number(formData.change),
      });
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Adjustment Failed");
    }
  };

  return (
    <div>
      <h1>Adjust Stock</h1>
      <form onSubmit={handleSubmit}>
        <select name="stockId" onChange={handleChange} required>
          <option value="">-- Select Stock Entry --</option>
          {stocks.map((item) => (
            <option key={item._id} value={item._id}>
              {item.product?.name} at {item.store?.name} (Current: {item.quantity})
            </option>
          ))}
        </select>
        <br /><br />
        <input
          type="number"
          name="change"
          placeholder="Adjustment (e.g. 10 or -5)"
          onChange={handleChange}
          required
        />
        <br /><br />
        <button type="submit">Adjust Stock</button>
      </form>
    </div>
  );
}

export default AdjustStock;
