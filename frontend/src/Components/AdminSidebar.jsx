import { Icon } from "@iconify/react";
import { Link, useLocation, Outlet } from "react-router-dom";

export default function AdminSidebar({ children }) {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: "mdi:chart-box", label: "Dashboard" },
    { path: "/admin/products", icon: "mdi:leaf", label: "Produk" },
    { path: "/admin/users", icon: "mdi:people", label: "User" },
    { path: "/admin/notifications", icon: "mdi:bell", label: "Notifikasi" },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="drawer drawer-open">
      {/* Toggle (DaisyUI) */}
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      {/* ===================== PAGE CONTENT ===================== */}
      <div className="drawer-content">{children ?? <Outlet />}</div>

      {/* ===================== SIDEBAR ===================== */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        {/* overlay (untuk mobile) */}
        <label
          htmlFor="admin-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <div className="is-drawer-close:w-14 is-drawer-open:w-64 bg-base-200 flex flex-col items-start min-h-full">
          {/* Brand */}
          <div className="p-4 w-full border-b border-base-300 flex items-center gap-2">
            <Icon icon="mdi:leaf" className="size-5" />
            <div className="is-drawer-close:hidden">
              <h1 className="text-lg font-bold text-primary leading-none">
                VertiGrow
              </h1>
              <p className="text-xs text-base-600">Admin Panel</p>
            </div>
          </div>

          {/* Menu */}
          <ul className="menu w-full grow">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  data-tip={item.label}
                  className={[
                    "is-drawer-close:tooltip is-drawer-close:tooltip-right",
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive(item.path)
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-300",
                  ].join(" ")}
                >
                  <Icon
                    icon={item.icon}
                    className="inline-block size-4 my-1.5"
                  />
                  <span className="is-drawer-close:hidden">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Bottom actions */}
          <div className="w-full border-t border-base-300">
            <div className="p-2 flex items-center gap-2">
              <Link
                to="/"
                className="btn btn-outline btn-sm w-full justify-start"
              >
                <Icon icon="mdi:logout" />
                <span className="is-drawer-close:hidden">Kembali ke User</span>
              </Link>

              {/* Tombol buka/tutup drawer */}
              <div
                className="m-1 is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Open"
              >
                <label
                  htmlFor="admin-drawer"
                  className="btn btn-ghost btn-circle drawer-button is-drawer-open:rotate-y-180"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="inline-block size-4 my-1.5"
                  >
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M9 4v16"></path>
                    <path d="M14 10l2 2l-2 2"></path>
                  </svg>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
