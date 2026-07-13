import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllStock, getTransfers, getAllProduct, getAllStore } from "../../services/api";

function AdminDashboard() {
  const [stocks, setStocks] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const stockData = await getAllStock();
        setStocks(stockData.Stocks || []);

        const transData = await getTransfers();
        setTransfers(transData.transfers || []);

        const prodData = await getAllProduct();
        setProducts(prodData.Products || []);

        const storeData = await getAllStore();
        setStores(storeData.Stores || []);
      } catch (error) {
        console.log(error);
      }
    }
    loadDashboard();
  }, []);

  return (
    <div >
      <h1>Admin Dashboard</h1>

      <nav >
        <Link to="/create-product" style={{ marginRight: "15px" }}>Create Product</Link>
        <Link to="/create-store" style={{ marginRight: "15px" }}>Create Store</Link>
        <Link to="/create-stock" style={{ marginRight: "15px" }}>Create Stock Entry</Link>
        <Link to="/adjust-stock" style={{ marginRight: "15px" }}>Adjust Stock</Link>
        <Link to="/transfer-stock" style={{ marginRight: "15px" }}>Transfer Stock</Link>
      </nav>

      <h2>Current Stock levels</h2>
      <table border="1" >
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
            <tr><td >No stock found.</td></tr>
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

      <h2>Registered Products</h2>
      <table border="1" >
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Product Name</th>
            <th>SKU</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td >No products registered.</td></tr>
          ) : (
            products.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.sku}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2>Registered Stores</h2>
      <table border="1" >
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Store Name</th>
          </tr>
        </thead>
        <tbody>
          {stores.length === 0 ? (
            <tr><td>No stores registered.</td></tr>
          ) : (
            stores.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h2>Transfer History</h2>
      <table border="1" >
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
            <tr><td >No transfer history.</td></tr>
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
