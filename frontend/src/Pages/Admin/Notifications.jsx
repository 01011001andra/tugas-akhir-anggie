"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const handleMarkAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    localStorage.setItem("notifications", JSON.stringify(updated));
    setNotifications(updated);
  };

  const handleDelete = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    localStorage.setItem("notifications", JSON.stringify(updated));
    setNotifications(updated);
  };

  const handleClearAll = () => {
    if (window.confirm("Hapus semua notifikasi?")) {
      localStorage.setItem("notifications", JSON.stringify([]));
      setNotifications([]);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      order: "mdi:shopping-cart",
      user: "mdi:account",
      product: "mdi:leaf",
      message: "mdi:message",
    };
    return icons[type] || "mdi:bell";
  };

  const getNotificationColor = (type) => {
    const colors = {
      order: "bg-blue-100 text-blue-700",
      user: "bg-green-100 text-green-700",
      product: "bg-purple-100 text-purple-700",
      message: "bg-orange-100 text-orange-700",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex min-h-screen bg-base-100">
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-base-900 mb-2">
              <Icon icon="mdi:bell" className="inline-block mr-2" />
              Notifikasi
            </h1>
            <p className="text-base-600">
              {unreadCount} notifikasi belum dibaca dari {notifications.length}{" "}
              total
            </p>
          </div>
          {notifications.length > 0 && (
            <button
              onClick={handleClearAll}
              className="btn btn-outline btn-error"
            >
              <Icon icon="mdi:trash" />
              Hapus Semua
            </button>
          )}
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="card bg-base-200 p-12 text-center">
            <Icon
              icon="mdi:bell-off"
              className="text-6xl text-base-300 mx-auto mb-4"
            />
            <p className="text-xl text-base-600">Tidak ada notifikasi</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`card bg-base-200 p-6 ${
                  notif.read ? "opacity-75" : "shadow-lg"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`${getNotificationColor(
                      notif.type
                    )} p-3 rounded-lg flex-shrink-0`}
                  >
                    <Icon
                      icon={getNotificationIcon(notif.type)}
                      className="text-2xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{notif.title}</h3>
                    <p className="text-base-600 mt-1">{notif.message}</p>
                    <p className="text-sm text-base-500 mt-2">
                      {new Date(notif.timestamp).toLocaleString("id-ID")}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    {!notif.read && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="btn btn-sm btn-ghost text-blue-500"
                        title="Tandai sebagai dibaca"
                      >
                        <Icon icon="mdi:check" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif.id)}
                      className="btn btn-sm btn-ghost text-red-500"
                    >
                      <Icon icon="mdi:trash" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Demo Button */}
        <div className="mt-8 p-6 bg-base-200 rounded-lg">
          <p className="text-sm text-base-600 mb-3">
            Catatan: Notifikasi akan muncul ketika ada pesanan baru dari
            pengguna.
          </p>
          <button
            onClick={() => {
              const newNotif = {
                id: Date.now(),
                type: "order",
                title: "Pesanan Baru",
                message:
                  "Ada pesanan baru dari Budi Santoso untuk Tanaman Monstera",
                timestamp: new Date().toISOString(),
                read: false,
                revenue: 150000,
              };
              const existing = JSON.parse(
                localStorage.getItem("notifications") || "[]"
              );
              localStorage.setItem(
                "notifications",
                JSON.stringify([newNotif, ...existing])
              );
              setNotifications([newNotif, ...existing]);
            }}
            className="btn btn-sm btn-outline btn-info"
          >
            <Icon icon="mdi:plus" />
            Simulasi Notifikasi Pesanan
          </button>
        </div>
      </main>
    </div>
  );
}
