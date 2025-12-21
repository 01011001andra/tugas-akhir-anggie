import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import {
  getMyCart,
  updateCartItemQty,
  removeCartItem,
  clearMyCart,
} from "../../../services/cart.service";
import { useCartStore } from "../../../stores/cart.store";

export default function Cart() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // =========================
  // ZUSTAND
  // =========================
  const items = useCartStore((s) => s.items);
  const updateQtyStore = useCartStore((s) => s.updateQty);
  const removeStoreItem = useCartStore((s) => s.removeItem);
  const clearStore = useCartStore((s) => s.clear);

  // =========================
  // HELPERS
  // =========================
  const rupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n || 0);

  const getImageSrc = (base64) => {
    if (!base64 || typeof base64 !== "string" || base64.length < 50)
      return null;
    if (base64.startsWith("data:image")) return base64;
    return `data:image/png;base64,${base64}`;
  };

  // =========================
  // INIT CART (API → STORE)
  // =========================
  useEffect(() => {
    const initCart = async () => {
      try {
        setLoading(true);
        const { data } = await getMyCart();
        useCartStore.getState().setFromApi(data?.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initCart();
  }, []);

  // =========================
  // ACTIONS (SAFE QTY)
  // =========================
  const handleUpdateQty = async (item, nextQty) => {
    // ❌ tidak boleh kurang dari 1
    if (nextQty < 1) return;

    // ❌ block saat increase melebihi stok
    if (nextQty > item.quantity && nextQty > item.stock) return;

    const prevQty = item.quantity;

    // ✅ optimistic update (UI + navbar langsung update)
    updateQtyStore(item.productId, nextQty);

    try {
      // 1️⃣ update ke backend
      await updateCartItemQty(item.productId, nextQty);

      // 2️⃣ ambil cart TERBARU dari backend
      const { data } = await getMyCart();

      // 3️⃣ sync ulang ke store
      useCartStore.getState().setFromApi(data?.items || []);
    } catch (err) {
      console.error(err);

      // 🔥 rollback kalau gagal
      updateQtyStore(item.productId, prevQty);

      alert("Gagal update qty");
    }
  };

  const handleRemoveItem = async (productId) => {
    removeStoreItem(productId);

    try {
      await removeCartItem(productId);
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus item");
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    const { name, email, phone, address } = checkoutForm;
    if (!name || !email || !phone || !address) {
      alert("Lengkapi semua data pengiriman");
      return;
    }

    try {
      setIsCheckingOut(true);
      clearStore(); // 🔥 navbar langsung 0
      await clearMyCart(); // backend
      navigate("/products");
    } finally {
      setIsCheckingOut(false);
    }
  };

  // =========================
  // TOTAL
  // =========================
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = items.length ? 25000 : 0;
  const total = subtotal + shipping;

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Icon icon="mdi:shopping-cart" />
          Keranjang Belanja
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 flex items-center justify-center flex-col">
            <Icon icon="mdi:cart-off" className="text-6xl text-base-300 mb-4" />
            <p className="text-lg text-base-600 mb-4">Keranjang Anda kosong</p>
            <button
              onClick={() => navigate("/products")}
              className="btn btn-primary"
            >
              Lanjut Belanja
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CART TABLE */}
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Produk</th>
                    <th className="text-center">Qty</th>
                    <th className="text-right">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const imageSrc = getImageSrc(item.image);
                    const stock = item.product?.stock ?? 0;
                    console.log(stock);
                    return (
                      <tr key={item.productId}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-14 h-14 bg-base-300 rounded overflow-hidden flex items-center justify-center">
                              {imageSrc ? (
                                <img
                                  src={imageSrc}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Icon
                                  icon="mdi:image-off-outline"
                                  className="text-2xl text-base-400"
                                />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{item.title}</div>
                              <div className="text-sm text-primary">
                                {rupiah(item.price)}
                              </div>
                              <div className="text-xs opacity-60">
                                Stok: {stock}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* QTY */}
                        <td className="text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              disabled={item.quantity <= 1}
                              className="btn btn-xs"
                              onClick={() =>
                                handleUpdateQty(item, item.quantity - 1)
                              }
                            >
                              −
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              disabled={item.quantity >= stock}
                              className="btn btn-xs"
                              onClick={() =>
                                handleUpdateQty(item, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>

                        <td className="text-right font-semibold">
                          {rupiah(item.price * item.quantity)}
                        </td>

                        <td className="text-right">
                          <button
                            onClick={() => handleRemoveItem(item.productId)}
                            className="btn btn-xs btn-error btn-ghost"
                          >
                            <Icon icon="mdi:trash" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* SUMMARY */}
            <div className="space-y-6">
              <div className="card bg-base-200 p-6">
                <h2 className="font-bold mb-4">Ringkasan</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{rupiah(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ongkir</span>
                    <span>{rupiah(shipping)}</span>
                  </div>
                  <div className="divider" />
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span>{rupiah(total)}</span>
                  </div>
                </div>
              </div>

              {/* CHECKOUT */}
              <form
                onSubmit={handleCheckout}
                className="card bg-base-200 p-6 space-y-3"
              >
                <h2 className="font-bold">Data Pengiriman</h2>
                {["name", "email", "phone"].map((f) => (
                  <input
                    key={f}
                    className="input input-bordered w-full"
                    placeholder={f.toUpperCase()}
                    value={checkoutForm[f]}
                    onChange={(e) =>
                      setCheckoutForm({
                        ...checkoutForm,
                        [f]: e.target.value,
                      })
                    }
                  />
                ))}
                <textarea
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  placeholder="Alamat Lengkap"
                  value={checkoutForm.address}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      address: e.target.value,
                    })
                  }
                />
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Memproses..." : "Checkout"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
