"use client";

import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import AdminSidebar from "../../Components/AdminSidebar";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Hias",
    image: "",
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) setProducts(JSON.parse(savedProducts));
  }, []);

  const handleSave = () => {
    if (!form.name || !form.price) {
      alert("Lengkapi semua field");
      return;
    }

    let updated;
    if (editingId) {
      updated = products.map((p) =>
        p.id === editingId
          ? {
              ...p,
              name: form.name,
              price: Number.parseInt(form.price),
              category: form.category,
              image:
                form.image ||
                "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop",
            }
          : p
      );
    } else {
      updated = [
        ...products,
        {
          id: Math.max(...products.map((p) => p.id), 0) + 1,
          name: form.name,
          price: Number.parseInt(form.price),
          category: form.category,
          image:
            form.image ||
            "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop",
          rating: 4.5,
        },
      ];
    }

    localStorage.setItem("products", JSON.stringify(updated));
    setProducts(updated);
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
    });
    setEditingId(product.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      const updated = products.filter((p) => p.id !== id);
      localStorage.setItem("products", JSON.stringify(updated));
      setProducts(updated);
    }
  };

  const resetForm = () => {
    setForm({ name: "", price: "", category: "Hias", image: "" });
    setEditingId(null);
  };

  const categories = ["Hias", "Bunga", "Kaktus"];

  return (
    <div className="flex min-h-screen bg-base-100">

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-base-900 mb-2">
              <Icon icon="mdi:leaf" className="inline-block mr-2" />
              Kelola Produk
            </h1>
            <p className="text-base-600">Total: {products.length} produk</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="btn btn-primary"
          >
            <Icon icon="mdi:plus" />
            Tambah Produk
          </button>
        </div>

        {/* Products Table */}
        <div className="card bg-base-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="bg-base-300">
                  <th>Nama Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-base-300">
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <p className="font-semibold">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-ghost">
                        {product.category}
                      </span>
                    </td>
                    <td className="font-semibold text-primary">
                      Rp {product.price.toLocaleString()}
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="btn btn-sm btn-ghost text-blue-500"
                        >
                          <Icon icon="mdi:pencil" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
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
                {editingId ? "Edit Produk" : "Tambah Produk Baru"}
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Produk"
                  className="input input-bordered w-full"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Harga"
                  className="input input-bordered w-full"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <select
                  className="select select-bordered w-full"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="URL Gambar (opsional)"
                  className="input input-bordered w-full"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
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
