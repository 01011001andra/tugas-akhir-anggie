import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCartItems(JSON.parse(savedCart));
  }, []);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (
      !checkoutForm.name ||
      !checkoutForm.email ||
      !checkoutForm.phone ||
      !checkoutForm.address
    ) {
      alert("Lengkapi semua data pengiriman");
      return;
    }

    setIsCheckingOut(true);
    setTimeout(() => {
      alert("Pesanan berhasil dibuat! Terima kasih telah berbelanja.");
      localStorage.setItem("cart", JSON.stringify([]));
      setCartItems([]);
      setCheckoutForm({ name: "", email: "", phone: "", address: "" });
      setIsCheckingOut(false);
      navigate("/products");
    }, 1500);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 25000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">
          <Icon icon="mdi:shopping-cart" className="inline-block mr-2" />
          Keranjang Belanja
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="card bg-base-200 p-8 text-center">
                <Icon
                  icon="mdi:cart-off"
                  className="text-6xl text-base-300 mx-auto mb-4"
                />
                <p className="text-xl text-base-600 mb-4">
                  Keranjang Anda kosong
                </p>
                <button
                  onClick={() => navigate("/products")}
                  className="btn btn-primary"
                >
                  Lanjut Belanja
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="card bg-base-200 p-4 flex flex-row items-center gap-4"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-primary font-semibold">
                        Rp {item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="btn btn-xs btn-ghost"
                      >
                        <Icon icon="mdi:minus" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            Number.parseInt(e.target.value)
                          )
                        }
                        className="input input-bordered input-xs w-16 text-center"
                        min="1"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="btn btn-xs btn-ghost"
                      >
                        <Icon icon="mdi:plus" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="btn btn-xs btn-error btn-ghost"
                    >
                      <Icon icon="mdi:trash" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Form & Summary */}
          <div className="space-y-6">
            {cartItems.length > 0 && (
              <>
                {/* Order Summary */}
                <div className="card bg-base-200 p-6">
                  <h2 className="text-xl font-bold mb-4">Ringkasan Pesanan</h2>
                  <div className="space-y-2 mb-4 border-b border-base-300 pb-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>Rp {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ongkir</span>
                      <span>Rp {shipping.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-primary">
                    <span>Total</span>
                    <span>Rp {total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Form */}
                <div className="card bg-base-200 p-6">
                  <h2 className="text-xl font-bold mb-4">Data Pengiriman</h2>
                  <form onSubmit={handleCheckout} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      className="input input-bordered w-full"
                      value={checkoutForm.name}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="input input-bordered w-full"
                      value={checkoutForm.email}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          email: e.target.value,
                        })
                      }
                    />
                    <input
                      type="tel"
                      placeholder="No. HP"
                      className="input input-bordered w-full"
                      value={checkoutForm.phone}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          phone: e.target.value,
                        })
                      }
                    />
                    <textarea
                      placeholder="Alamat Lengkap"
                      className="textarea textarea-bordered w-full"
                      rows="3"
                      value={checkoutForm.address}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          address: e.target.value,
                        })
                      }
                    />
                    <button
                      type="submit"
                      className="btn btn-primary w-full"
                      disabled={isCheckingOut}
                    >
                      {isCheckingOut ? (
                        <>
                          <Icon icon="mdi:loading" className="animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <Icon icon="mdi:check" />
                          Checkout
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
