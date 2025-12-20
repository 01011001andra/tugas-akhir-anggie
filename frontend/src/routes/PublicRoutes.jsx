import { Routes, Route } from "react-router-dom";

// Public pages
import Home from "../pages/public/home";
import About from "../pages/public/tentang";
import Layanan from "../pages/public/layanan";
import MainHero from "../pages/public/mainHero";
import ProductList from "../pages/public/ProductList";
import Cart from "../pages/public/Cart";

// Auth
import Daftar from "../pages/auth/Daftar";
import Masuk from "../pages/auth/Masuk";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/daftar" element={<Daftar />} />
      <Route path="/masuk" element={<Masuk />} />
      <Route path="/tentang" element={<About />} />
      <Route path="/layanan" element={<Layanan />} />
      <Route path="/mainhero" element={<MainHero />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}
