"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const notifications = JSON.parse(
      localStorage.getItem("notifications") || "[]"
    );

    setStats({
      totalProducts: products.length,
      totalUsers: users.length,
      totalOrders: notifications.filter((n) => n.type === "order").length,
      totalRevenue: notifications.reduce((sum, n) => sum + (n.revenue || 0), 0),
    });
  }, []);

  const dashboardCards = [
    {
      icon: "mdi:leaf",
      title: "Total Produk",
      value: stats.totalProducts,
      color: "text-green-500",
      bgColor: "bg-green-100",
      link: "/admin/products",
    },
    {
      icon: "mdi:people",
      title: "Total User",
      value: stats.totalUsers,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
      link: "/admin/users",
    },
    {
      icon: "mdi:shopping-cart",
      title: "Total Pesanan",
      value: stats.totalOrders,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
      link: "/admin/notifications",
    },
    {
      icon: "mdi:cash",
      title: "Total Revenue",
      value: `Rp ${stats.totalRevenue.toLocaleString()}`,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
      link: "#",
    },
  ];

  return (
    <div className="flex min-h-screen bg-base-100">
      <main className="flex-1">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-base-900 mb-2">
              <Icon icon="mdi:chart-box" className="inline-block mr-2" />
              Dashboard Admin
            </h1>
            <p className="text-base-600">
              Selamat datang di panel admin VertiGrow
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardCards.map((card, idx) => (
              <div
                key={idx}
                onClick={() => card.link !== "#" && navigate(card.link)}
                className={`card bg-base-200 shadow-xl hover:shadow-2xl transition-all cursor-pointer ${
                  card.link === "#" ? "cursor-default" : ""
                }`}
              >
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-base-600 text-sm">{card.title}</p>
                      <p className="text-3xl font-bold text-base-900 mt-2">
                        {card.value}
                      </p>
                    </div>
                    <div className={`${card.bgColor} p-3 rounded-lg`}>
                      <Icon
                        icon={card.icon}
                        className={`text-2xl ${card.color}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title mb-4">Aksi Cepat</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate("/admin/products")}
                  className="btn btn-outline btn-primary justify-start"
                >
                  <Icon icon="mdi:plus" />
                  Tambah Produk
                </button>
                <button
                  onClick={() => navigate("/admin/users")}
                  className="btn btn-outline btn-info justify-start"
                >
                  <Icon icon="mdi:account-plus" />
                  Kelola User
                </button>
                <button
                  onClick={() => navigate("/admin/notifications")}
                  className="btn btn-outline btn-warning justify-start"
                >
                  <Icon icon="mdi:bell" />
                  Notifikasi
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-outline btn-success justify-start"
                >
                  <Icon icon="mdi:home" />
                  Ke Beranda
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
