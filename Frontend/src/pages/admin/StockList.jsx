import { useEffect, useState } from "react";
import { getAllStock } from "../../services/api";

function StockList() {
  const [stocks, setStocks] = useState([]);
  const [threshold, setThreshold] = useState("");

  const fetchStocks = async (thresh = "") => {
    try {
      const response = await getAllStock(thresh);
      setStocks(response.Stocks || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleFilter = () => {
    fetchStocks(threshold);
  };

  const handleClear = () => {
    setThreshold("");
    fetchStocks("");
  };

  return (
    <div>
      <h2>Stock List</h2>
      <div style={{ marginBottom: "16px" }}>
        <input
          type="number"
          placeholder="Filter at or below threshold"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
        />
        <button onClick={handleFilter}>Apply Filter</button>
        <button onClick={handleClear}>Clear</button>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Store Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td>{stock.product?.name || "Unknown"}</td>
              <td>{stock.product?.sku || "-"}</td>
              <td>{stock.store?.name || "Unknown"}</td>
              <td>{stock.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;
