import { useEffect, useState } from "react";
import { getAllStock } from "../../services/api";

function ShopperDashboard() {
  const [stocks, setStocks] = useState([]);
  const [threshold, setThreshold] = useState("");

  const loadStocks = async (thresh = "") => {
    try {
      const data = await getAllStock(thresh);
      setStocks(data.Stocks || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadStocks();
  }, []);

  const handleFilter = () => {
    loadStocks(threshold);
  };

  const handleClear = () => {
    setThreshold("");
    loadStocks("");
  };

  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
      <h1>Shopper Catalogue</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Filter stock level at or below: </label>
        <input
          type="number"
          value={threshold}
          placeholder="Enter threshold"
          onChange={(e) => setThreshold(e.target.value)}
        />
        <button onClick={handleFilter} style={{ marginLeft: "10px" }}>Filter</button>
        <button onClick={handleClear} style={{ marginLeft: "5px" }}>Clear</button>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Store Name</th>
            <th>Available Quantity</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length === 0 ? (
            <tr><td colSpan="4">No available stock matches query.</td></tr>
          ) : (
            stocks.map((item) => (
              <tr key={item._id}>
                <td>{item.product?.name}</td>
                <td>{item.product?.sku}</td>
                <td>{item.store?.name}</td>
                <td>{item.quantity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ShopperDashboard;
