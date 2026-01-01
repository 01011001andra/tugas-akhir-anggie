import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getMyTransactions } from "../../../../services/transaction.service";

export default function Transaction() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [preview, setPreview] = useState(null); // base64 preview

  // =========================
  // HELPERS
  // =========================
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
        return {
          label: "Approved",
          className: "badge-success",
        };
      case "REJECTED":
        return {
          label: "Rejected",
          className: "badge-error",
        };
      default: // PENDING
        return {
          label: "Waiting Approval",
          className: "badge-warning",
        };
    }
  };

  // =========================
  // FETCH TRANSACTIONS
  // =========================
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const { data } = await getMyTransactions();
        setTransactions(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Icon icon="mdi:receipt-text" />
          Riwayat Transaksi
        </h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : transactions.length === 0 ? (
          <div className="text-center py-20">
            <Icon
              icon="mdi:clipboard-text-off-outline"
              className="text-6xl opacity-30 mb-4"
            />
            <p className="text-lg opacity-70">Belum ada transaksi</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-base-200 rounded-lg">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tanggal</th>
                  <th>Produk</th>
                  <th className="text-right">Total</th>
                  <th>Pembayaran</th>
                  <th>Status</th>
                  <th>Bukti</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((trx, idx) => (
                  <tr key={trx.id}>
                    <td>{idx + 1}</td>

                    <td className="text-sm">
                      {new Date(trx.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="text-sm">
                      {trx.product?.title || "Produk dihapus"}
                    </td>

                    <td className="text-right font-semibold">
                      {rupiah(trx.totalPrice)}
                    </td>

                    <td className="text-sm">{trx.paymentMethod}</td>

                    <td>
                      {(() => {
                        const cfg = statusConfig(trx.status);
                        return (
                          <span className={`badge ${cfg.className}`}>
                            {cfg.label}
                          </span>
                        );
                      })()}
                    </td>

                    <td>
                      {trx.proof ? (
                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() => setPreview(trx.proof)}
                        >
                          Lihat
                        </button>
                      ) : (
                        <span className="text-xs opacity-50">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* PREVIEW MODAL */}
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
    </div>
  );
}
