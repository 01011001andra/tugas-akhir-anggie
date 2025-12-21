import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "@/services/product.service";
import { fileToBase64 } from "../../utils/helper";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    stock: "",
    price: "",
    image: "",
  });

  const MAX_STOCK = 100000;
  const MAX_PRICE = 100000000;

  // =======================
  // HELPERS
  // =======================
  const getImageSrc = (base64) => {
    if (!base64) return null;
    if (base64.startsWith("data:image")) return base64;
    return `data:image/png;base64,${base64}`;
  };

  // =======================
  // FETCH PRODUCTS
  // =======================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();

      // SUPPORT: array langsung ATAU pagination
      const list = Array.isArray(res.data) ? res.data : res.data?.results || [];

      setProducts(list);
    } catch (e) {
      console.error("Fetch products error:", e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =======================
  // SAVE (CREATE / UPDATE)
  // =======================
  const handleSave = async () => {
    if (!form.title || !form.price || !form.stock) {
      alert("Lengkapi field wajib");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: form.title,
        description: form.description,
        stock: Number(form.stock),
        price: Number(form.price),
        image: form.image || null,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }

      await fetchProducts();
      resetForm();
      setShowModal(false);
    } catch (e) {
      console.error("Save product error:", e);
      alert("Gagal menyimpan produk");
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // INPUT VALIDATION
  // =======================
  const handleIntegerChange = (e, field, max) => {
    const raw = e.target.value;
    if (!/^\d*$/.test(raw)) return;

    if (raw === "") {
      setForm((p) => ({ ...p, [field]: "" }));
      return;
    }

    const num = Number(raw);
    if (num > max) return;

    setForm((p) => ({ ...p, [field]: raw }));
  };

  // =======================
  // EDIT
  // =======================
  const handleEdit = (product) => {
    setForm({
      title: product.title,
      description: product.description || "",
      stock: String(product.stock),
      price: String(product.price),
      image: product.image || "",
    });
    setEditingId(product.id);
    setShowModal(true);
  };

  // =======================
  // DELETE
  // =======================
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus produk ini?")) return;

    try {
      setLoading(true);
      await deleteProduct(id);
      await fetchProducts();
    } catch (e) {
      console.error("Delete error:", e);
      alert("Gagal menghapus produk");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      stock: "",
      price: "",
      image: "",
    });
    setEditingId(null);
  };

  // =======================
  // IMAGE PICK
  // =======================
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await fileToBase64(file);
    setForm((p) => ({ ...p, image: base64 }));
  };

  // =======================
  // UI
  // =======================
  return (
    <div className="flex min-h-screen bg-base-100">
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              <Icon icon="mdi:package-variant" className="inline mr-2" />
              Kelola Produk
            </h1>
            <p>Total: {products.length} produk</p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            <Icon icon="mdi:plus" />
            Tambah Produk
          </button>
        </div>

        {/* TABLE */}
        <div className="card bg-base-200 shadow">
          <table className="table">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Stok</th>
                <th>Harga</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-10">
                    <span className="loading loading-spinner loading-md mr-2" />
                    Memuat produk...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-16">
                    <Icon
                      icon="mdi:package-variant-remove"
                      className="text-4xl text-base-300 mb-2"
                    />
                    <p className="opacity-60">Belum ada produk</p>
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {getImageSrc(p.image) ? (
                          <img
                            src={getImageSrc(p.image)}
                            className="w-12 h-12 rounded object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded bg-base-300 flex items-center justify-center">
                            <Icon
                              icon="mdi:image-off-outline"
                              className="text-xl opacity-40"
                            />
                          </div>
                        )}

                        <div>
                          <div className="font-semibold">{p.title}</div>
                          <div className="text-sm opacity-60">
                            {p.description || "Tanpa deskripsi"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>{p.stock}</td>

                    <td className="font-semibold text-primary">
                      Rp {p.price.toLocaleString()}
                    </td>

                    <td>
                      <button
                        onClick={() => handleEdit(p)}
                        className="btn btn-sm btn-ghost text-blue-500"
                      >
                        <Icon icon="mdi:pencil" />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="btn btn-sm btn-ghost text-red-500"
                      >
                        <Icon icon="mdi:trash" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg mb-4">
                {editingId ? "Edit Produk" : "Tambah Produk"}
              </h3>

              <div className="space-y-3">
                <input
                  className="input input-bordered w-full"
                  placeholder="Nama Produk"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                />

                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Deskripsi"
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                />

                <input
                  className="input input-bordered w-full"
                  placeholder="Stok"
                  value={form.stock}
                  onChange={(e) => handleIntegerChange(e, "stock", MAX_STOCK)}
                />

                <input
                  className="input input-bordered w-full"
                  placeholder="Harga"
                  value={form.price}
                  onChange={(e) => handleIntegerChange(e, "price", MAX_PRICE)}
                />

                <input
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  onChange={handleImageChange}
                />

                {form.image && (
                  <img
                    src={getImageSrc(form.image)}
                    className="w-24 h-24 rounded object-cover"
                  />
                )}
              </div>

              <div className="modal-action">
                <button
                  className="btn"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  Batal
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
