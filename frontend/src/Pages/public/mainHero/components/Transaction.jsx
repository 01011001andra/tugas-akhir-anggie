import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { getMyTransactions } from "../../../../services/transaction.service";
import { createReview } from "../../../../services/review.service";

export default function Transaction() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [preview, setPreview] = useState(null);
  console.log(preview);
  // =========================
  // REVIEW MODAL STATE
  // =========================
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewProduct, setReviewProduct] = useState(null);
  const [transactionDetail, setTransactionDetail] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
        return { label: "Approved", className: "badge-success" };
      case "REJECTED":
        return { label: "Rejected", className: "badge-error" };
      default:
        return { label: "Waiting Approval", className: "badge-warning" };
    }
  };

  // =========================
  // FETCH TRANSACTIONS
  // =========================
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
  useEffect(() => {
    fetchTransactions();
  }, []);

  // =========================
  // REVIEW HANDLERS
  // =========================
  const openReviewModal = (product, trx) => {
    setTransactionDetail(trx);
    setReviewProduct(product);
    setRating(0);
    setComment("");
    setReviewOpen(true);
  };

  const closeReviewModal = () => {
    setReviewOpen(false);
    setReviewProduct(null);
  };

  const submitReview = async () => {
    if (!rating || !comment.trim()) return;

    try {
      setSubmitting(true);

      await createReview({
        productId: reviewProduct.id,
        transactionId: transactionDetail.id,
        rating,
        comment,
      });

      closeReviewModal();
      fetchTransactions()
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

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
                  <th>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((trx, idx) => {
                  const isApproved =
                    trx.status === "APPROVED" || trx.status === "PAID";
                  const isReviewed = trx.isReviewed === true;

                  return (
                    <tr key={trx.id}>
                      <td>{idx + 1}</td>

                      <td className="text-sm">
                        {new Date(trx.createdAt).toLocaleDateString("id-ID")}
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

                      {/* 🔥 AKSI FINAL */}
                      <td>
                        {isApproved && trx.product ? (
                          isReviewed ? (
                            <button
                              className="btn btn-xs btn-outline"
                              onClick={() =>
                                navigate(`/products/${trx.productId}`)
                              }
                            >
                              <Icon icon="mdi:eye" />
                              Review
                            </button>
                          ) : (
                            <button
                              className="btn btn-xs btn-primary"
                              onClick={() => openReviewModal(trx.product, trx)}
                            >
                              <Icon icon="mdi:star-plus" />
                              Review
                            </button>
                          )
                        ) : (
                          <span className="text-xs opacity-50">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* ================= REVIEW MODAL ================= */}
      {reviewOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">Tulis Review</h3>
            <p className="text-sm opacity-70 mb-4">{reviewProduct?.title}</p>

            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)}>
                  <Icon
                    icon={rating >= star ? "mdi:star" : "mdi:star-outline"}
                    className={`text-3xl ${
                      rating >= star ? "text-yellow-400" : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              placeholder="Tulis komentar kamu..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="modal-action">
              <button className="btn btn-ghost" onClick={closeReviewModal}>
                Batal
              </button>
              <button
                className="btn btn-primary"
                disabled={!rating || !comment || submitting}
                onClick={submitReview}
              >
                {submitting && (
                  <span className="loading loading-spinner loading-xs mr-2" />
                )}
                Kirim
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
