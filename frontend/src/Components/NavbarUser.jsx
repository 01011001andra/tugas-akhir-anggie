import { useNavigate, useSearchParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useCartStore } from "../stores/cart.store";
import { useSessionStore } from "../stores/session.store";

export default function NavbarUser() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { session, clearSession } = useSessionStore();

  const rawType = searchParams.get("type");

  // 🔥 default ke "main" jika null atau "main"
  const activeType = rawType && rawType !== "main" ? rawType : "main";

  const handleLogout = () => {
    clearSession();
    useCartStore.getState().clear();
    localStorage.removeItem("accessToken");
    navigate("/", { replace: true });
  };

  const handleMenu = (type) => {
    setSearchParams({ type });
  };

  return (
    <div className="navbar bg-base-100 container mx-auto px-4">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <Icon icon="mdi:menu" className="text-2xl" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <button onClick={() => handleMenu("transaction")}>
                Transaksi
              </button>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="text-xl font-bold text-green-600"
        >
          VertiGrow
        </button>
      </div>

      {/* CENTER (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">
          {[
            { label: "Main", type: "main" },
            { label: "Transaksi", type: "transaction" },
          ].map((item) => (
            <li key={item.type}>
              <button
                onClick={() => handleMenu(item.type)}
                className={`rounded-full px-4 ${
                  activeType === item.type
                    ? "bg-green-100 text-green-700 font-semibold"
                    : "hover:bg-base-200"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end">
        {/* User Dropdown */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="size-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-semibold">
              {session?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </label>

          <ul
            tabIndex={0}
            className="dropdown-content mt-3 z-[50] w-56 rounded-xl bg-base-100 shadow-xl border border-base-200 p-2"
          >
            {/* Profile */}
            <li className="px-3 py-2">
              <div className="flex flex-col">
                <span className="font-semibold truncate">
                  {session?.name || "User"}
                </span>
                <span className="text-xs text-base-content/60">
                  {session?.role}
                </span>
              </div>
            </li>

            <div className="divider my-1" />

            {/* Back */}
            <li>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200"
              >
                <Icon icon="mdi:arrow-left" className="text-lg" />
                Kembali ke Beranda
              </button>
            </li>

            {/* Logout */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-error hover:bg-error/10"
              >
                <Icon icon="solar:logout-2-bold" className="text-lg" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
