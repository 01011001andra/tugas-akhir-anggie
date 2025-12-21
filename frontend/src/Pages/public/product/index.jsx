import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { getProducts } from "../../../services/product.service";
import { addCartItem } from "../../../services/cart.service";
import { useCartStore } from "../../../stores/cart.store";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState("relevan");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState(null);

  const addLocalItem = useCartStore((s) => s.addItem);

  // =====================
  // IMAGE HANDLER
  // =====================
  const getImageSrc = (base64) => {
    if (!base64 || typeof base64 !== "string" || base64.length < 50)
      return null;
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
        const res = await getProducts();
        setProducts(res?.data || []);
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
  // ADD TO CART (API + STORE)
  // =====================
  const handleAddToCart = async (product) => {
    if (product.stock <= 0) return;

    try {
      setAddingId(product.id);

      // 1️⃣ simpan ke backend
      await addCartItem(product.id, 1);

      // 2️⃣ update local store (BIAR NAVBAR LANGSUNG UPDATE)
      addLocalItem(product);
    } catch (err) {
      console.error(err);
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
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Icon icon="mdi:leaf" className="text-success" />
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

            <div className="ml-auto">
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
            </div>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paged.map((product) => {
              const imageSrc = getImageSrc(product.image);
              const isAdding = addingId === product.id;

              return (
                <div
                  key={product.id}
                  className="card bg-base-200 shadow hover:shadow-lg transition"
                >
                  <figure className="h-48 bg-base-300 flex items-center justify-center">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Icon
                        icon="mdi:image-off-outline"
                        className="text-5xl text-base-400"
                      />
                    )}
                  </figure>

                  <div className="card-body">
                    <h2 className="font-semibold line-clamp-2">
                      {product.title}
                    </h2>

                    <p className="text-primary font-bold">
                      {rupiah(product.price)}
                    </p>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={isAdding || product.stock <= 0}
                      className="btn btn-primary btn-sm w-full"
                    >
                      {isAdding ? (
                        <>
                          <Icon icon="mdi:loading" className="animate-spin" />
                          Menambahkan…
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
              );
            })}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="join grid grid-flow-col gap-2 w-fit mx-auto mt-10">
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
