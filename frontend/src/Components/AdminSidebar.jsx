import { Icon } from "@iconify/react";
import { Link, useLocation, Outlet } from "react-router-dom";

export default function AdminSidebar({ children }) {
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: "mdi:view-dashboard",
      label: "Dashboard",
    },
    { path: "/admin/products", icon: "mdi:leaf", label: "Produk" },
    { path: "/admin/educations", icon: "mdi:book", label: "Education" },
    { path: "/admin/users", icon: "mdi:account-group", label: "User" },
    {
      path: "/admin/notifications",
      icon: "mdi:bell-outline",
      label: "Notifikasi",
    },
  ];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div className="drawer drawer-open min-h-screen bg-base-100">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content bg-base-100">{children ?? <Outlet />}</div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay" />

        <aside
          className="
            bg-base-200 min-h-full border-r border-base-300
            is-drawer-open:w-64 is-drawer-close:w-16
            transition-all duration-300 ease-in-out
            flex flex-col
          "
        >
          {/* BRAND */}
          <div className="h-16 px-4 flex items-center gap-3 border-b border-base-300">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-success/10">
              <Icon icon="mdi:leaf" className="text-success size-5" />
            </div>

            <div className="is-drawer-close:hidden leading-tight">
              <h1 className="font-bold text-lg">VertiGrow</h1>
              <p className="text-xs opacity-60">Admin Panel</p>
            </div>
          </div>

          {/* MENU */}
          <ul className="menu w-72 px-3 py-4 gap-1 flex-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    data-tip={item.label}
                    className={[
                      "relative flex items-center gap-3 px-3 py-3 rounded-xl",
                      "transition-all duration-200",
                      "hover:bg-base-300/60 hover:translate-x-1",
                      "is-drawer-close:tooltip is-drawer-close:tooltip-right",
                      active
                        ? "bg-success/10 text-success font-semibold"
                        : "text-base-content/80",
                    ].join(" ")}
                  >
                    {/* ACTIVE INDICATOR */}
                    {active && (
                      <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-success" />
                    )}

                    <Icon
                      icon={item.icon}
                      className={`size-5 transition-all ${
                        active ? "scale-110" : "opacity-80"
                      }`}
                    />

                    <span className="is-drawer-close:hidden">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* BOTTOM */}
          <div className="border-t border-base-300 p-3">
            <Link
              to="/"
              className="
                btn btn-outline btn-sm w-full justify-start gap-2
                hover:bg-base-300
              "
            >
              <Icon icon="mdi:arrow-left" />
              <span className="is-drawer-close:hidden">Kembali</span>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
