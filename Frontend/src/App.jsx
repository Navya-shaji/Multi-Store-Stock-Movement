import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/admin/CreateProduct";
import CreateStore from "./pages/admin/CreateStore";
import CreateStock from "./pages/admin/CreateStock";
import AdjustStock from "./pages/admin/AdjustStock";
import TransferStock from "./pages/admin/TransferStock";
import AdminRoute from "./pages/admin/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Admin Operational Routes */}
        <Route path="/create-product" element={<AdminRoute><CreateProduct /></AdminRoute>} />
        <Route path="/create-store" element={<AdminRoute><CreateStore /></AdminRoute>} />
        <Route path="/create-stock" element={<AdminRoute><CreateStock /></AdminRoute>} />
        <Route path="/adjust-stock" element={<AdminRoute><AdjustStock /></AdminRoute>} />
        <Route path="/transfer-stock" element={<AdminRoute><TransferStock /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
