import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import {
  getMyCart,
  updateCartItemQty,
  removeCartItem,
} from "../../../services/cart.service";
import { useCartStore } from "../../../stores/cart.store";
import { createTransaction } from "../../../services/transaction.service";

export default function Cart() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [payment, setPayment] = useState({
    method: "",
    proof: null, // 🔥 BASE64
    proofPreview: null,
  });

  // =========================
  // ZUSTAND
  // =========================
  const items = useCartStore((s) => s.items);
  const updateQtyStore = useCartStore((s) => s.updateQty);
  const removeStoreItem = useCartStore((s) => s.removeItem);
  const clearStore = useCartStore((s) => s.clear);

  // =========================
  // PAYMENT GUIDE
  // =========================
  const paymentGuides = [
    {
      key: "BCA",
      label: "Transfer Bank BCA",
      account: "1234567890",
      name: "PT VERTIGROW INDONESIA",
      steps: [
        "Buka BCA Mobile / KlikBCA",
        "Pilih Transfer → Ke Rekening BCA",
        "Masukkan nomor rekening tujuan",
        "Masukkan nominal sesuai total pembayaran",
        "Simpan bukti transfer",
      ],
    },
    {
      key: "BRI",
      label: "Transfer Bank BRI",
      account: "0987654321",
      name: "PT VERTIGROW INDONESIA",
      steps: [
        "Buka BRImo / ATM BRI",
        "Pilih Transfer → Ke Rekening BRI",
        "Masukkan nomor rekening tujuan",
        "Masukkan nominal sesuai total pembayaran",
        "Simpan bukti transfer",
      ],
    },
    {
      key: "MANDIRI",
      label: "Transfer Bank Mandiri",
      account: "111222333444",
      name: "PT VERTIGROW INDONESIA",
      steps: [
        "Buka Livin’ by Mandiri",
        "Pilih Transfer → Ke Rekening Mandiri",
        "Masukkan nomor rekening tujuan",
        "Masukkan nominal sesuai total pembayaran",
        "Simpan bukti transfer",
      ],
    },
  ];

  // =========================
  // HELPERS
  // =========================
  const rupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n || 0);

  // 🔥 File → Base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // =========================
  // INIT CART
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
  // CART ACTIONS
  // =========================
  const handleUpdateQty = async (item, nextQty) => {
    if (nextQty < 1 || nextQty > item.product.stock) return;

    const prevQty = item.quantity;
    updateQtyStore(item.productId, nextQty);

    try {
      await updateCartItemQty(item.productId, nextQty);
      const { data } = await getMyCart();
      useCartStore.getState().setFromApi(data?.items || []);
    } catch {
      updateQtyStore(item.productId, prevQty);
      alert("Gagal update qty");
    }
  };

  const handleRemoveItem = async (productId) => {
    removeStoreItem(productId);
    try {
      await removeCartItem(productId);
    } catch {
      alert("Gagal menghapus item");
    }
  };

  // =========================
  // CHECKOUT FLOW
  // =========================
  const handleCheckout = (e) => {
    e.preventDefault();

    const { name, email, phone, address } = checkoutForm;
    if (!name || !email || !phone || !address) {
      alert("Lengkapi semua data pengiriman");
      return;
    }

    setShowPaymentModal(true);
  };

  const handleConfirmPayment = async () => {
    if (!payment.method) return alert("Pilih metode pembayaran");
    if (!payment.proof) return alert("Upload bukti transfer");

    try {
      setIsCheckingOut(true);

      await createTransaction({
        items,
        paymentMethod: payment.method,
        proof: payment.proof, // 🔥 kirim base64
      });

      clearStore();
      setShowPaymentModal(false);
      navigate("/mainhero?type=transaction");
    } catch (err) {
      console.error(err);
      alert("Checkout gagal");
    } finally {
      setIsCheckingOut(false);
    }
  };

  // =========================
  // TOTAL
  // =========================
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = items.length ? 25000 : 0;
  const total = subtotal + shipping;

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
          <div className="text-center py-20">
            <Icon icon="mdi:cart-off" className="text-6xl opacity-30 mb-4" />
            <p>Keranjang Anda kosong</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CART */}
            <div className="lg:col-span-2 overflow-x-auto">
              <table className="table">
                <tbody>
                  {items.map((item) => (
                    <tr key={item.productId}>
                      <td>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-primary">
                          {rupiah(item.price)}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            className="btn btn-xs"
                            onClick={() =>
                              handleUpdateQty(item, item.quantity - 1)
                            }
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
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
                          className="btn btn-xs btn-error btn-ghost"
                          onClick={() => handleRemoveItem(item.productId)}
                        >
                          <Icon icon="mdi:trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* SUMMARY */}
            <div className="space-y-6">
              <div className="card bg-base-200 p-6">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">{rupiah(total)}</span>
                </div>
              </div>

              <form
                onSubmit={handleCheckout}
                className="card bg-base-200 p-6 space-y-3"
              >
                <h2 className="font-bold">Data Pengiriman</h2>
                {["name", "email", "phone"].map((f) => (
                  <input
                    key={f}
                    className="input input-bordered"
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
                  className="textarea textarea-bordered"
                  placeholder="Alamat Lengkap"
                  value={checkoutForm.address}
                  onChange={(e) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      address: e.target.value,
                    })
                  }
                />
                <button className="btn btn-primary w-full">Checkout</button>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-3">Konfirmasi Pembayaran</h3>

            {/* TOTAL */}
            <div className="bg-base-200 rounded-lg p-3 mb-4">
              <div className="flex justify-between font-bold text-primary">
                <span>Total Bayar</span>
                <span>{rupiah(total)}</span>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            {paymentGuides.map((pg) => (
              <label
                key={pg.key}
                className="block border rounded-lg p-3 mb-3 cursor-pointer hover:bg-base-200"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    className="radio radio-primary"
                    checked={payment.method === pg.key}
                    onChange={() => setPayment({ ...payment, method: pg.key })}
                  />
                  <span className="font-medium">{pg.label}</span>
                </div>

                {payment.method === pg.key && (
                  <div className="mt-3 bg-base-100 p-3 rounded-lg text-sm space-y-2">
                    <p>
                      <b>No. Rekening:</b> {pg.account}
                    </p>
                    <p>
                      <b>Atas Nama:</b> {pg.name}
                    </p>
                    <ol className="list-decimal ml-5 space-y-1">
                      {pg.steps.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  </div>
                )}
              </label>
            ))}

            {/* UPLOAD */}
            <div className="mt-4">
              <label className="label">
                <span className="label-text font-semibold">
                  Bukti Transfer
                  <span className="text-error ml-1">*</span>
                </span>
              </label>

              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const base64 = await fileToBase64(file);
                  setPayment({
                    ...payment,
                    proof: base64,
                    proofPreview: base64,
                  });
                }}
              />
            </div>

            {payment.proofPreview && (
              <div className="mt-3">
                <p className="text-sm font-medium mb-1">Preview Bukti:</p>
                <img
                  src={payment.proofPreview}
                  alt="Bukti Transfer"
                  className="max-h-40 rounded-lg border object-contain"
                />
              </div>
            )}

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setShowPaymentModal(false)}
              >
                Batal
              </button>
              <button
                className="btn btn-primary"
                disabled={isCheckingOut}
                onClick={handleConfirmPayment}
              >
                {isCheckingOut ? "Memproses..." : "Konfirmasi"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
