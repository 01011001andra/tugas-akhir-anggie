import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Logo from "../assets/Logo/Logo Vertigrow Blok.png";
import { useSessionStore } from "../stores/session.store";
import { useCartStore } from "../stores/cart.store";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, clearSession } = useSessionStore();

  const [scrolling, setScrolling] = useState(false);

  // ✅ AMBIL ITEMS, BUKAN FUNCTION
  const cartItems = useCartStore((s) => s.items);

  // ✅ HITUNG DENGAN useMemo (AMAN & CEPAT)
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // ========================
  // SCROLL SHADOW
  // ========================
  useEffect(() => {
    const onScroll = () => setScrolling(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    clearSession();
    useCartStore.getState().clear(); // 🔥 reset cart saat logout
    localStorage.removeItem("accessToken");
    navigate("/", { replace: true });
  };

  const navItems = [
    { label: "Beranda", path: "/" },
    { label: "Tentang Kami", path: "/tentang" },
    { label: "Layanan", path: "/layanan" },
    { label: "Produk", path: "/products" },
  ];

  return (
    <div
      className={`navbar container mx-auto bg-base-100 px-4 transition-shadow ${
        scrolling ? "shadow-md" : ""
      }`}
    >
      {/* LEFT */}
      <div className="navbar-start">
        {/* MOBILE MENU */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <Icon icon="mdi:menu" className="text-2xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems.map((item) => (
              <li key={item.path}>
                <a
                  className={
                    location.pathname === item.path
                      ? "active font-semibold"
                      : ""
                  }
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* LOGO */}
        <img
          src={Logo}
          alt="Vertigrow"
          className="h-12 w-12 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 px-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                onClick={() => navigate(item.path)}
                className={`rounded-full px-4 ${
                  location.pathname === item.path
                    ? "bg-green-100 text-green-800 font-semibold"
                    : "hover:bg-base-200"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2">
        {/* CART */}
        <button
          className="btn btn-ghost btn-circle relative"
          onClick={() => navigate("/cart")}
          disabled={!session}
        >
          <Icon icon="mdi:shopping-cart" className="text-xl" />

          {cartCount > 0 && (
            <span className="badge badge-error badge-sm absolute top-1 right-1">
              {cartCount}
            </span>
          )}
        </button>

        {/* AUTH */}
        {!session ? (
          <>
            <button
              className="btn btn-outline btn-success hidden lg:flex"
              onClick={() => navigate("/masuk")}
            >
              Masuk
            </button>
            <button
              className="btn btn-success hidden lg:flex"
              onClick={() => navigate("/daftar")}
            >
              Daftar
            </button>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle hover:bg-base-200 transition"
            >
              <div className="relative">
                <div className="size-11 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-semibold text-lg shadow-md">
                  {session.name?.charAt(0).toUpperCase()}
                </div>
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-success ring-2 ring-base-100" />
              </div>
            </label>

            <ul className="dropdown-content mt-3 z-[50] w-60 rounded-2xl bg-base-100 shadow-xl border border-base-200 p-2">
              <li className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold flex items-center justify-center">
                    {session.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold truncate">
                      {session.name}
                    </span>
                    <span className="text-xs text-base-content/60">
                      Administrator
                    </span>
                  </div>
                </div>
              </li>

              <div className="divider my-1" />

              <li>
                <Link
                  to={"/admin/dashboard"}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-base-200 transition"
                >
                  <Icon
                    icon="solar:dashboard-bold"
                    className="text-lg text-primary"
                  />
                  <span className="font-medium">Dashboard</span>
                </Link>
              </li>

              <li>
                <a
                  onClick={handleLogout}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-error hover:bg-error/10 transition"
                >
                  <Icon icon="solar:logout-2-bold" className="text-lg" />
                  <span className="font-medium">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
