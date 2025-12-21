import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/home";
import About from "../pages/public/tentang";
import Layanan from "../pages/public/layanan";
import ProductList from "../pages/public/product";
import Cart from "../pages/public/cart/Cart";

import Daftar from "../pages/auth/Daftar";
import Masuk from "../pages/auth/Masuk";
import PublicRoute from "./PublicRoute";
import ProductDetail from "../pages/public/product/ProductDetail";
import MainHero from "../pages/public/mainHero";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tentang" element={<About />} />
      <Route path="/layanan" element={<Layanan />} />
      <Route path="/mainhero" element={<MainHero />} />
      {/* PRODUCTS */}
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />{" "}
      {/* ✅ DETAIL */}
      {/* CART */}
      <Route path="/cart" element={<Cart />} />
      {/* ❌ tidak boleh diakses kalau sudah login */}
      <Route
        path="/masuk"
        element={
          <PublicRoute>
            <Masuk />
          </PublicRoute>
        }
      />
      <Route
        path="/daftar"
        element={
          <PublicRoute>
            <Daftar />
          </PublicRoute>
        }
      />
    </Routes>
  );
}
