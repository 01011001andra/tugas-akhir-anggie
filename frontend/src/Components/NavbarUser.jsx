import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../services/auth.service";
import { useCartStore } from "../stores/cart.store";

export default function NavbarUser() {
  const navigate = useNavigate();
  const totalQty = useCartStore((s) => s.totalQty());


  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      // panggil API logout (blacklist token)
      if (refreshToken) {
        await logout(refreshToken);
      }

      // bersihkan local storage
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      toast.success("Logout berhasil");

      navigate("/masuk");
    } catch (error) {
      console.error(error);
      // fallback kalau API gagal
      localStorage.clear();
      navigate("/masuk");
    }
  };

  return (
    <section className="container flex justify-between items-center py-3">
      {/* Logo */}
      <div className="flex items-center gap-5">
        <img
          src="https://picsum.photos/200/200"
          alt="logo"
          className="w-14 h-14 rounded-full"
        />
        <h3 className="text-xl font-semibold">VertiGrow</h3>
      </div>

      {/* Menu */}
      <ul className="flex gap-10 font-semibold">
        <li>Edukasi Vertikultur</li>
        <li>Manajemen Limbah</li>
        <li>Mr.Grow</li>
      </ul>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-orange-500 rounded-full w-24 text-white py-2 hover:bg-orange-600 transition"
      >
        Logout
      </button>
    </section>
  );
}
