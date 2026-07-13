import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllStock, getTransfers } from "../../services/api";

function AdminDashboard() {
  const [stocks, setStocks] = useState([]);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const stockData = await getAllStock();
        setStocks(stockData.Stocks || []);
        const transData = await getTransfers();
        setTransfers(transData.transfers || []);
      } catch (error) {
        console.log(error);
      }
    }
    loadDashboard();
  }, []);

  return (
    <div style={{ textAlign: "left", padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      {/* Navigation links */}
      <nav style={{ marginBottom: "30px", borderBottom: "1px solid #ccc", paddingBottom: "15px" }}>
        <Link to="/create-product" style={{ marginRight: "15px" }}>Create Product</Link>
        <Link to="/create-store" style={{ marginRight: "15px" }}>Create Store</Link>
        <Link to="/create-stock" style={{ marginRight: "15px" }}>Create Stock Entry</Link>
        <Link to="/adjust-stock" style={{ marginRight: "15px" }}>Adjust Stock</Link>
        <Link to="/transfer-stock" style={{ marginRight: "15px" }}>Transfer Stock</Link>
      </nav>

      {/* Stocks display */}
      <h2>Current Stock levels</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", marginBottom: "30px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Store Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {stocks.length === 0 ? (
            <tr><td colSpan="4">No stock found.</td></tr>
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

      {/* Transfers logs */}
      <h2>Transfer History</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Product</th>
            <th>From Store</th>
            <th>To Store</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transfers.length === 0 ? (
            <tr><td colSpan="5">No transfer history.</td></tr>
          ) : (
            transfers.map((item) => (
              <tr key={item._id}>
                <td>{item.product?.name}</td>
                <td>{item.fromStore?.name}</td>
                <td>{item.toStore?.name}</td>
                <td>{item.quantity}</td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
