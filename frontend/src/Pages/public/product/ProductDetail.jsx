import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

import { getProductById } from "../../../services/product.service";
import { addCartItem, getMyCart } from "../../../services/cart.service";
import { getReviewsByProduct } from "../../../services/review.service";
import { useCartStore } from "../../../stores/cart.store";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [adding, setAdding] = useState(false);

  // =====================
  // FETCH PRODUCT
  // =====================
  useEffect(() => {
    let mounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getProductById(id);
        if (mounted) setProduct(res?.data || null);
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (id) fetchProduct();
    return () => (mounted = false);
  }, [id]);

  // =====================
  // FETCH REVIEWS
  // =====================
  useEffect(() => {
    let mounted = true;

    const fetchReviews = async () => {
      try {
        setLoadingReviews(true);
        const res = await getReviewsByProduct(id);
        if (mounted) setReviews(res?.data || []);
      } catch (err) {
        console.error(err);
        setReviews([]);
      } finally {
        if (mounted) setLoadingReviews(false);
      }
    };

    if (id) fetchReviews();
    return () => (mounted = false);
  }, [id]);

  // =====================
  // HELPERS
  // =====================
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

  // =====================
  // ADD TO CART
  // =====================
  const handleAddToCart = async () => {
    if (!product || product.stock <= 0) return;

    try {
      setAdding(true);
      await addCartItem(product.id, 1);
      const { data } = await getMyCart();
      useCartStore.getState().setFromApi(data?.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setAdding(false);
    }
  };

  // =====================
  // STATES
  // =====================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-base-100">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <Icon
            icon="mdi:package-variant-remove"
            className="text-7xl text-base-300 mb-4"
          />
          <h2 className="text-2xl font-bold mb-2">Produk tidak ditemukan</h2>
          <button
            onClick={() => navigate("/products")}
            className="btn btn-primary mt-4"
          >
            Kembali ke Produk
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const imageSrc = getImageSrc(product.image);

  // =====================
  // UI
  // =====================
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* IMAGE */}
          <div className="card bg-base-200 shadow-lg">
            <figure className="aspect-square p-6">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={product.title}
                  className="rounded-xl object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <Icon
                    icon="mdi:image-off-outline"
                    className="text-8xl text-base-300"
                  />
                </div>
              )}
            </figure>
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold">{product.title}</h1>

            <div className="flex items-center gap-4">
              <p className="text-3xl font-extrabold text-primary">
                {rupiah(product.price)}
              </p>
              {product.stock > 0 ? (
                <span className="badge badge-success">Stok tersedia</span>
              ) : (
                <span className="badge badge-error">Stok habis</span>
              )}
            </div>

            <p className="text-base-content/80">
              {product.description || "Produk ini belum memiliki deskripsi."}
            </p>

            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                disabled={adding || product.stock <= 0}
                className="btn btn-primary gap-2"
              >
                {adding ? (
                  <>
                    <Icon icon="mdi:loading" className="animate-spin" />
                    Menambahkan...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:cart-plus" />
                    Tambah ke Keranjang
                  </>
                )}
              </button>
            </div>

            <div className="divider" />

            {/* EXTRA */}
            <div className="flex gap-6 text-sm opacity-70">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:shield-check" />
                Produk Original
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:truck-fast" />
                Pengiriman Cepat
              </div>
            </div>
          </div>
        </div>

        {/* =====================
            REVIEW SECTION
           ===================== */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Icon icon="mdi:star" className="text-yellow-400" />
            Ulasan Produk
          </h2>

          {loadingReviews ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-md" />
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-10 opacity-60">
              Belum ada ulasan untuk produk ini
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="card bg-base-200 shadow-sm">
                  <div className="card-body">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold">
                        {review.user?.name || "User"}
                      </p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Icon
                            key={star}
                            icon={
                              review.rating >= star
                                ? "mdi:star"
                                : "mdi:star-outline"
                            }
                            className={`${
                              review.rating >= star
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-base-content/80">
                      {review.comment}
                    </p>

                    <p className="text-xs opacity-50 mt-2">
                      {new Date(review.createdAt).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
