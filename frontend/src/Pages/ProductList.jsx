import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [filter, setFilter] = useState("Semua");

  // UI state tambahan
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState("relevan"); // relevan|price-asc|price-desc|name-asc|name-desc
  const [priceCap, setPriceCap] = useState(0); // harga maksimum (slider)
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const navigate = useNavigate();

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    const savedCart = localStorage.getItem("cart");
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      setProducts(parsed);
      // set default harga max ke nilai maksimum produk
      const maxP = parsed.length
        ? Math.max(...parsed.map((p) => Number(p.price) || 0))
        : 0;
      setPriceCap(maxP || 0);
    }
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const categories = ["Semua", "Hias", "Bunga", "Kaktus"];

  // format rupiah
  const rupiah = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n || 0);

  // filter + search + sort (memoized)
  const filteredSorted = useMemo(() => {
    let list = [...products];

    // kategori
    if (filter !== "Semua") {
      list = list.filter((p) => p.category === filter);
    }

    // harga maks (jika priceCap > 0)
    if (priceCap > 0) {
      list = list.filter((p) => Number(p.price) <= priceCap);
    }

    // search (nama/kategori/harga)
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          (p.name || "").toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q) ||
          String(p.price || "").includes(q)
      );
    }

    // sort
    switch (sortMode) {
      case "price-asc":
        list.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        list.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "name-asc":
        list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
        break;
      case "name-desc":
        list.sort((a, b) => (b.name || "").localeCompare(a.name || ""));
        break;
      default:
        // relevan: biarkan urutan seperti tersimpan
        break;
    }

    return list;
  }, [products, filter, priceCap, query, sortMode]);

  // pagination
  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredSorted.slice(start, start + pageSize);
  }, [filteredSorted, page, pageSize]);

  useEffect(() => {
    // reset ke halaman 1 saat filter/search berubah
    setPage(1);
  }, [filter, query, sortMode, priceCap]);

  const ensureToastContainer = () => {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast toast-top toast-end z-50";
      document.body.appendChild(container);
    }
    return container;
  };

  const showToast = (msg, type = "success") => {
    const container = ensureToastContainer();
    const toast = document.createElement("div");
    toast.className = `alert alert-${type}`;
    toast.innerHTML = `<span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    showToast(`${product.name} ditambahkan ke keranjang!`, "success");
  };

  const clearFilters = () => {
    setFilter("Semua");
    setQuery("");
    setSortMode("relevan");
    const maxP = products.length
      ? Math.max(...products.map((p) => Number(p.price) || 0))
      : 0;
    setPriceCap(maxP || 0);
  };

  // nilai max slider (fallback bila belum ada products)
  const sliderMax = products.length
    ? Math.max(...products.map((p) => Number(p.price) || 0))
    : 0;

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* HEADER */}
        <div className="mb-6 flex flex-col mt-20 gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-base-900">
              <Icon
                icon="mdi:leaf"
                className="inline-block mr-2 text-success"
              />
              Koleksi Tanaman
            </h1>
            <p className="text-base-600">
              Temukan tanaman pilihan untuk rumah Anda
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => navigate("/cart")}
              title="Lihat keranjang"
            >
              <Icon icon="mdi:cart" />
              <span className="hidden sm:inline">Keranjang</span>
              {cartItems.length > 0 && (
                <div className="badge badge-primary">
                  {cartItems.reduce((a, c) => a + (c.quantity || 0), 0)}
                </div>
              )}
            </button>
            <button className="btn btn-ghost btn-sm" onClick={clearFilters}>
              <Icon icon="mdi:filter-remove" />
              Reset
            </button>
          </div>
        </div>

        {/* TOOLBAR FILTER / SEARCH */}
        <div className="card bg-base-200 shadow-lg mb-8">
          <div className="card-body gap-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-3">
              {/* Search */}
              <label className="input input-bordered flex items-center gap-2 w-full lg:max-w-md">
                <Icon icon="mdi:magnify" className="opacity-70" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Cari nama/kategori/harga…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>

              {/* Kategori (pills) */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`btn btn-sm ${
                      filter === cat ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Sort + page size */}
              <div className="ml-auto flex flex-wrap gap-2">
                <select
                  className="select select-bordered select-sm"
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value)}
                  title="Urutkan"
                >
                  <option value="relevan">Paling relevan</option>
                  <option value="price-asc">Harga: rendah → tinggi</option>
                  <option value="price-desc">Harga: tinggi → rendah</option>
                  <option value="name-asc">Nama: A → Z</option>
                  <option value="name-desc">Nama: Z → A</option>
                </select>

                <select
                  className="select select-bordered select-sm"
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  title="Jumlah per halaman"
                >
                  {[8, 12, 24].map((n) => (
                    <option key={n} value={n}>
                      {n}/hal
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Range harga */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-center">
              <div className="col-span-2">
                <input
                  type="range"
                  min={0}
                  max={sliderMax || 0}
                  value={priceCap}
                  onChange={(e) => setPriceCap(Number(e.target.value))}
                  className="range"
                  step="1000"
                  disabled={!sliderMax}
                />
                <div className="mt-1 text-sm text-base-600">
                  Harga maks:{" "}
                  <span className="font-semibold">{rupiah(priceCap || 0)}</span>
                  {sliderMax ? (
                    <span className="opacity-70">
                      {" "}
                      (max {rupiah(sliderMax)})
                    </span>
                  ) : (
                    <span className="opacity-70"> — data belum tersedia</span>
                  )}
                </div>
              </div>
              <div className="lg:justify-self-end">
                <div className="badge badge-ghost">
                  {filteredSorted.length} hasil
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GRID PRODUK */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {paged.map((product) => (
            <div
              key={product.id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition"
            >
              <figure className="px-4 pt-4 relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="rounded-xl h-48 w-full object-cover"
                />
                <span className="badge badge-primary absolute left-5 top-5">
                  {product.category}
                </span>
              </figure>

              <div className="card-body">
                <h2 className="card-title text-base line-clamp-2">
                  {product.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="rating rating-sm">
                    {[...Array(5)].map((_, i) => {
                      const checked = Math.round(product.rating || 0) === i + 1;
                      return (
                        <input
                          key={i}
                          type="radio"
                          name={`rating-${product.id}`}
                          className="mask mask-star-2 bg-yellow-400"
                          disabled
                          defaultChecked={checked}
                        />
                      );
                    })}
                  </div>
                  <span className="text-xs text-base-500">
                    ({product.rating ?? "4.5"})
                  </span>
                </div>

                <p className="text-2xl font-bold text-primary">
                  {rupiah(product.price)}
                </p>

                <div className="card-actions mt-3">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-primary btn-sm w-full"
                  >
                    <Icon icon="mdi:shopping-cart" />
                    Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredSorted.length === 0 && (
          <div className="text-center py-16">
            <Icon
              icon="mdi:magnify-off"
              className="text-6xl text-base-300 mx-auto mb-4"
            />
            <p className="text-xl text-base-600">Tidak ada produk ditemukan</p>
          </div>
        )}

        {/* PAGINATION */}
        {filteredSorted.length > 0 && (
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
