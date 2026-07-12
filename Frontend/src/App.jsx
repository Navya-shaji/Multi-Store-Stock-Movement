import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/register";
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/admin/adminLogin";
import CreateProduct from "./pages/admin/CreateProduct";
import AdminRoute from "./pages/admin/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route
          path="/product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
