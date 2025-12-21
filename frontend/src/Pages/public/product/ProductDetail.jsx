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

      <main className="max-w-5xl mx-auto px-4 py-10 mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* IMAGE */}
        <div className="bg-base-200 rounded-xl flex items-center justify-center p-4">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={product.title}
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <Icon
              icon="mdi:image-off-outline"
              className="text-7xl text-base-400"
            />
          )}
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          <p className="text-xl text-primary font-bold mb-4">
            {rupiah(product.price)}
          </p>

          <p className="mb-4 text-base-content/80">
            {product.description || "Tidak ada deskripsi"}
          </p>

          <p className="mb-6 text-sm">
            Stok tersedia:{" "}
            <span className="font-semibold">{product.stock}</span>
          </p>

          <button
            onClick={handleAddToCart}
            disabled={adding || product.stock <= 0}
            className="btn btn-primary"
          >
            {adding ? (
              <>
                <Icon icon="mdi:loading" className="animate-spin" />
                Menambahkan...
              </>
            ) : (
              <>
                <Icon icon="mdi:shopping-cart" />
                Tambah ke Keranjang
              </>
            )}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
