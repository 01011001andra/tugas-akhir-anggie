import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useCartStore } from "../../../stores/cart.store";
import { getProducts } from "../../../services/product.service";
import { addCartItem } from "../../../services/cart.service";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState("relevan");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);

  const addItem = useCartStore((s) => s.addItem);

  // =====================
  // IMAGE HANDLER
  // =====================
  const getImageSrc = (base64) => {
    if (!base64 || typeof base64 !== "string" || base64.length < 50) {
      return null;
    }
    if (base64.startsWith("data:image")) return base64;
    return `data:image/png;base64,${base64}`;
  };

  // =====================
  // FETCH PRODUCTS
  // =====================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await getProducts();
        setProducts(result?.data || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================
  // FORMAT RUPIAH
  // =====================
  const rupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n || 0);

  // =====================
  // FILTER + SORT
  // =====================
  const filteredSorted = useMemo(() => {
    let list = [...products];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(q) ||
          String(p.price || "").includes(q)
      );
    }

    switch (sortMode) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return list;
  }, [products, query, sortMode]);

  // =====================
  // PAGINATION
  // =====================
  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [query, sortMode]);

  // =====================
  // ADD TO CART (API FIRST)
  // =====================
  const handleAddToCart = async (product) => {
    if (product.stock <= 0) return;

    try {
      setAddingId(product.id);

      // 1️⃣ simpan ke backend (cart + cartItem)
      await addCartItem(product.id, 1);

      // 2️⃣ optimistic update ke store
      addItem(product);
    } catch (err) {
      console.error("Gagal add to cart:", err);
      alert("Gagal menambahkan ke keranjang");
    } finally {
      setAddingId(null);
    }
  };

  // =====================
  // UI
  // =====================
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 mt-20">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">
            <Icon icon="mdi:leaf" className="inline-block mr-2 text-success" />
            Produk
          </h1>
          <p className="text-base-600">Daftar produk yang tersedia</p>
        </div>

        {/* TOOLBAR */}
        <div className="card bg-base-200 mb-8">
          <div className="card-body flex flex-col lg:flex-row gap-3">
            <label className="input input-bordered flex items-center gap-2 w-full lg:max-w-md">
              <Icon icon="mdi:magnify" />
              <input
                type="text"
                className="grow"
                placeholder="Cari produk atau harga…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>

            <div className="ml-auto flex gap-2">
              <select
                className="select select-bordered select-sm"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value)}
              >
                <option value="relevan">Relevan</option>
                <option value="price-asc">Harga ↑</option>
                <option value="price-desc">Harga ↓</option>
                <option value="name-asc">Nama A–Z</option>
                <option value="name-desc">Nama Z–A</option>
              </select>

              <select
                className="select select-bordered select-sm"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {[8, 12, 24].map((n) => (
                  <option key={n} value={n}>
                    {n}/hal
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="text-center py-20">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : paged.length === 0 ? (
          <div className="text-center py-20">
            <Icon
              icon="mdi:package-variant-remove"
              className="text-6xl text-base-300 mb-4"
            />
            <p className="text-xl text-base-600">Produk tidak ditemukan</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {paged.map((product) => {
              const imageSrc = getImageSrc(product.image);
              const isAdding = addingId === product.id;

              return (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="card bg-base-200 shadow-xl hover:shadow-2xl transition"
                >
                  <figure className="p-4 flex items-center justify-center h-48 bg-base-300 rounded-xl">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={product.title}
                        className="rounded-xl h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-base-400">
                        <Icon
                          icon="mdi:image-off-outline"
                          className="text-5xl mb-2"
                        />
                        <span className="text-sm">No Image</span>
                      </div>
                    )}
                  </figure>

                  <div className="card-body">
                    <h2 className="card-title text-base line-clamp-2">
                      {product.title}
                    </h2>

                    <p className="text-sm text-base-500">
                      Stok: {product.stock?.toLocaleString() ?? 0}
                    </p>

                    <p className="text-2xl font-bold text-primary">
                      {rupiah(product.price)}
                    </p>

                    <div className="card-actions mt-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-primary btn-sm w-full"
                        disabled={product.stock <= 0 || isAdding}
                      >
                        {isAdding ? (
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
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="join grid grid-flow-col gap-2 w-fit mx-auto mb-8">
            <button
              className="btn btn-outline join-item"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              «
            </button>
            <button className="btn join-item pointer-events-none">
              Hal {page} / {totalPages}
            </button>
            <button
              className="btn btn-outline join-item"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              »
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
