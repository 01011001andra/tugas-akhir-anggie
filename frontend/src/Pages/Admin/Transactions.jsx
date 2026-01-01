import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import {
  getAllTransactions,
  updateTransactionStatus,
} from "@/services/transaction.service";

export default function AdminTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null); // base64 proof
  const [confirm, setConfirm] = useState({
    open: false,
    id: null,
    action: null, // APPROVE | REJECT
  });

  // =======================
  // HELPERS
  // =======================
  const rupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n || 0);

  const statusConfig = (status) => {
    switch (status) {
      case "PAID":
      case "APPROVED":
        return { label: "Approved", className: "badge-success" };
      case "REJECTED":
      case "FAILED":
        return { label: "Rejected", className: "badge-error" };
      default:
        return { label: "Waiting Approval", className: "badge-warning" };
    }
  };

  // =======================
  // FETCH TRANSACTIONS
  // =======================
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await getAllTransactions();
      const list = Array.isArray(res.data) ? res.data : res.data?.results || [];
      setTransactions(list);
    } catch (e) {
      console.error("Fetch transactions error:", e);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // =======================
  // UPDATE STATUS (APPROVE / REJECT)
  // =======================
  const handleUpdateStatus = async () => {
    try {
      setLoading(true);

      await updateTransactionStatus(confirm.id, {
        action: confirm.action, // 🔥 payload ke backend
      });

      await fetchTransactions();
      setConfirm({ open: false, id: null, action: null });
    } catch (e) {
      console.error("Update status error:", e);
      alert("Gagal memproses transaksi");
    } finally {
      setLoading(false);
    }
  };

  // =======================
  // UI
  // =======================
  return (
    <div className="flex min-h-screen bg-base-100">
      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <Icon icon="mdi:receipt-text" className="inline mr-2" />
            Kelola Transaksi
          </h1>
          <p>Total: {transactions.length} transaksi</p>
        </div>

        {/* TABLE */}
        <div className="card bg-base-200 shadow">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Produk</th>
                <th>Total</th>
                <th>Pembayaran</th>
                <th>Status</th>
                <th>Bukti</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-10">
                    <span className="loading loading-spinner loading-md mr-2" />
                    Memuat transaksi...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-16">
                    <Icon
                      icon="mdi:receipt-text-remove"
                      className="text-4xl text-base-300 mb-2"
                    />
                    <p className="opacity-60">Belum ada transaksi</p>
                  </td>
                </tr>
              ) : (
                transactions.map((t, idx) => {
                  const cfg = statusConfig(t.status);

                  return (
                    <tr key={t.id}>
                      <td>{idx + 1}</td>
                      <td className="text-sm">{t.user?.name || "-"}</td>
                      <td className="text-sm">
                        {t.product?.title || "Produk dihapus"}
                      </td>
                      <td className="font-semibold text-primary">
                        {rupiah(t.totalPrice)}
                      </td>
                      <td className="text-sm">{t.paymentMethod}</td>
                      <td>
                        <span className={`badge ${cfg.className}`}>
                          {cfg.label}
                        </span>
                      </td>
                      <td>
                        {t.proof ? (
                          <button
                            className="btn btn-xs btn-outline"
                            onClick={() => setPreview(t.proof)}
                          >
                            Lihat
                          </button>
                        ) : (
                          <span className="text-xs opacity-50">-</span>
                        )}
                      </td>
                      <td className="flex gap-1">
                        {t.status === "PENDING" && (
                          <>
                            <button
                              className="btn btn-xs btn-success"
                              onClick={() =>
                                setConfirm({
                                  open: true,
                                  id: t.id,
                                  action: "APPROVE",
                                })
                              }
                            >
                              <Icon icon="mdi:check" />
                            </button>
                            <button
                              className="btn btn-xs btn-error"
                              onClick={() =>
                                setConfirm({
                                  open: true,
                                  id: t.id,
                                  action: "REJECT",
                                })
                              }
                            >
                              <Icon icon="mdi:close" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* PREVIEW PROOF */}
      {preview && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-xl">
            <h3 className="font-bold text-lg mb-3">Bukti Transfer</h3>
            <img
              src={preview}
              alt="Bukti Transfer"
              className="w-full max-h-[400px] object-contain border rounded-lg"
            />
            <div className="modal-action">
              <button className="btn" onClick={() => setPreview(null)}>
                Tutup
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* CONFIRM MODAL */}
      {confirm.open && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              {confirm.action === "APPROVE"
                ? "Approve Transaksi"
                : "Reject Transaksi"}
            </h3>

            <p>
              Yakin ingin{" "}
              <b>{confirm.action === "APPROVE" ? "menyetujui" : "menolak"}</b>{" "}
              transaksi ini?
            </p>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() =>
                  setConfirm({ open: false, id: null, action: null })
                }
              >
                Batal
              </button>

              <button
                className={`btn ${
                  confirm.action === "APPROVE" ? "btn-success" : "btn-error"
                }`}
                onClick={handleUpdateStatus}
                disabled={loading}
              >
                {loading ? "Memproses..." : "Ya"}
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
