import { Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Offers from "./pages/Offers";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProductDetails from "./pages/ProductDetail";

// ADMIN
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminProducts from "./admin/Products";
import Orders from "./admin/Orders";
import Users from "./admin/Users";
import AddProduct from "./admin/AddProducts";
import EditProduct from "./admin/EditProduct";



const App = () => {
  const location = useLocation();
  const { loading } = useAuth(); // 🔥 REQUIRED

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div>
      <ScrollToTop />

      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AddProduct />} />{" "}
          {/* 👈 ADD THIS */}
          <Route path="orders" element={<Orders />} />
          <Route path="products/:id/edit" element={<EditProduct />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </div>
  );
};

export default App;
