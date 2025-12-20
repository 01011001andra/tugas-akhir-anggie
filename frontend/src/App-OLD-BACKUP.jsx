// Backup of original App.jsx - dapat dihapus setelah konfirmasi
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import About from "./Pages/Tentang"
import Layanan from "./Pages/Layanan"
import Masuk from "./Pages/Masuk"
import Daftar from "./Pages/Daftar"
import "bootstrap/dist/css/bootstrap.min.css"
import MainHero from "./Pages/MainHero"
import "font-awesome/css/font-awesome.min.css"

function AppOld() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/tentang" element={<About />} />
        <Route path="/layanan" element={<Layanan />} />
        <Route path="/MainHero" element={<MainHero />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppOld
