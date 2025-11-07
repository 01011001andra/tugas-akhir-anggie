"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import AdminSidebar from "../../Components/AdminSidebar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    joined: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }, []);

  const handleSave = () => {
    if (!form.name || !form.email || !form.phone) {
      alert("Lengkapi semua field");
      return;
    }

    let updated;
    if (editingId) {
      updated = users.map((u) =>
        u.id === editingId
          ? {
              ...u,
              name: form.name,
              email: form.email,
              phone: form.phone,
            }
          : u
      );
    } else {
      updated = [
        ...users,
        {
          id: Math.max(...users.map((u) => u.id), 0) + 1,
          name: form.name,
          email: form.email,
          phone: form.phone,
          joined: form.joined,
        },
      ];
    }

    localStorage.setItem("users", JSON.stringify(updated));
    setUsers(updated);
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      joined: user.joined,
    });
    setEditingId(user.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus user ini?")) {
      const updated = users.filter((u) => u.id !== id);
      localStorage.setItem("users", JSON.stringify(updated));
      setUsers(updated);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      joined: new Date().toISOString().split("T")[0],
    });
    setEditingId(null);
  };

  return (
    <div className="flex min-h-screen bg-base-100">

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-base-900 mb-2">
              <Icon icon="mdi:people" className="inline-block mr-2" />
              Kelola User
            </h1>
            <p className="text-base-600">Total: {users.length} user</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="btn btn-primary"
          >
            <Icon icon="mdi:plus" />
            Tambah User
          </button>
        </div>

        {/* Users Table */}
        <div className="card bg-base-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-300">
                  <th>Nama</th>
                  <th>Email</th>
                  <th>No. HP</th>
                  <th>Tergabung</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-base-300">
                    <td className="font-semibold">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.joined).toLocaleDateString("id-ID")}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="btn btn-sm btn-ghost text-blue-500"
                        >
                          <Icon icon="mdi:pencil" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-sm btn-ghost text-red-500"
                        >
                          <Icon icon="mdi:trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box w-full max-w-md">
              <h3 className="font-bold text-lg mb-4">
                {editingId ? "Edit User" : "Tambah User Baru"}
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Lengkap"
                  className="input input-bordered w-full"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="No. HP"
                  className="input input-bordered w-full"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                {!editingId && (
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={form.joined}
                    onChange={(e) =>
                      setForm({ ...form, joined: e.target.value })
                    }
                  />
                )}
              </div>

              <div className="modal-action mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="btn"
                >
                  Batal
                </button>
                <button onClick={handleSave} className="btn btn-primary">
                  {editingId ? "Update" : "Simpan"}
                </button>
              </div>
            </div>
            <div
              className="modal-backdrop"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
