import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

import { getProductById } from "../../../services/product.service";
import { addCartItem, getMyCart } from "../../../services/cart.service";
import { useCartStore } from "../../../stores/cart.store";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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

        if (mounted) {
          setProduct(res?.data || null);
        }
      } catch (err) {
        console.error(err);
        setProduct(null);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (id) fetchProduct();

    return () => {
      mounted = false;
    };
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
    if (!base64 || typeof base64 !== "string" || base64.length < 50) {
      return null;
    }
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

      // 1️⃣ backend
      await addCartItem(product.id, 1);

      // 2️⃣ sync ulang cart → zustand
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
          {/* IMAGE CARD */}
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

          {/* PRODUCT INFO */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                {product.title}
              </h1>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <p className="text-3xl font-extrabold text-primary">
                {rupiah(product.price)}
              </p>

              {product.stock > 0 ? (
                <span className="badge badge-success badge-lg text-white">
                  Stok tersedia
                </span>
              ) : (
                <span className="badge badge-error badge-lg text-white">
                  Stok habis
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-base-content/80">
              {product.description || "Produk ini belum memiliki deskripsi."}
            </p>

            {/* Stock Info */}
            <div className="flex items-center gap-2 text-sm">
              <Icon icon="mdi:warehouse" className="text-lg" />
              <span>
                Sisa stok:
                <span className="font-semibold ml-1">{product.stock}</span>
              </span>
            </div>

            {/* ACTION */}
            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                disabled={adding || product.stock <= 0}
                className="btn btn-primary btn-md w-full md:w-auto gap-2"
              >
                {adding ? (
                  <>
                    <Icon icon="mdi:loading" className="animate-spin text-xl" />
                    Menambahkan...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:cart-plus" className="text-xl" />
                    Tambah ke Keranjang
                  </>
                )}
              </button>
            </div>

            {/* Extra info */}
            <div className="divider" />

            <div className="flex gap-4 text-sm text-base-content/60">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:shield-check" className="text-lg" />
                Produk Original
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:truck-fast" className="text-lg" />
                Pengiriman Cepat
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
