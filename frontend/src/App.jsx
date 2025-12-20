import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Pages
import Home from "./pages/public/home";
import About from "./pages/public/tentang";
import Layanan from "./pages/public/layanan";
import MainHero from "./pages/public/mainHero";
import ProductList from "./pages/public/ProductList";
import Cart from "./pages/public/Cart";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminUsers from "./pages/admin/Users";
import AdminNotifications from "./pages/admin/Notifications";
import AdminSidebar from "./components/AdminSidebar";
import Daftar from "./pages/auth/Daftar";
import Masuk from "./pages/auth/Masuk";

function App() {
  useEffect(() => {
    const existingProducts = localStorage.getItem("products");
    const existingUsers = localStorage.getItem("users");
    const existingCart = localStorage.getItem("cart");

    if (!existingProducts) {
      const demoProducts = [
        {
          id: 1,
          name: "Tanaman Hias Monstera",
          price: 150000,
          image:
            "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=400&fit=crop",
          rating: 4.5,
          category: "Hias",
        },
        {
          id: 2,
          name: "Tanaman Bunga Mawar",
          price: 75000,
          image:
            "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop",
          rating: 4.8,
          category: "Bunga",
        },
        {
          id: 3,
          name: "Tanaman Kaktus Mini",
          price: 45000,
          image:
            "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
          rating: 4.2,
          category: "Kaktus",
        },
        {
          id: 4,
          name: "Tanaman Lidah Mertua",
          price: 95000,
          image:
            "https://images.unsplash.com/photo-1552058544-f53b5c45efb1?w=400&h=400&fit=crop",
          rating: 4.6,
          category: "Hias",
        },
      ];
      localStorage.setItem("products", JSON.stringify(demoProducts));
    }

    if (!existingUsers) {
      const demoUsers = [
        {
          id: 1,
          name: "Budi Santoso",
          email: "budi@example.com",
          phone: "081234567890",
          joined: "2024-01-15",
        },
      ];
      localStorage.setItem("users", JSON.stringify(demoUsers));
    }

    if (!existingCart) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/daftar" element={<Daftar />} />
      <Route path="/masuk" element={<Masuk />} />
      <Route path="/tentang" element={<About />} />
      <Route path="/layanan" element={<Layanan />} />
      <Route path="/MainHero" element={<MainHero />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminSidebar>
            <AdminDashboard />
          </AdminSidebar>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminSidebar>
            <AdminProducts />
          </AdminSidebar>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminSidebar>
            <AdminUsers />
          </AdminSidebar>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <AdminSidebar>
            <AdminNotifications />
          </AdminSidebar>
        }
      />
    </Routes>
  );
}

export default App;
