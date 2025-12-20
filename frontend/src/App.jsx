import { useEffect } from "react";
import AppRouter from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    const existingProducts = localStorage.getItem("products");
    const existingUsers = localStorage.getItem("users");
    const existingCart = localStorage.getItem("cart");

    if (!existingProducts) {
      const demoProducts = [
        {
          id: 1,
          name: "Tanaman Hias Monstera",
          price: 150000,
          image:
            "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=400&fit=crop",
          rating: 4.5,
          category: "Hias",
        },
        {
          id: 2,
          name: "Tanaman Bunga Mawar",
          price: 75000,
          image:
            "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop",
          rating: 4.8,
          category: "Bunga",
        },
        {
          id: 3,
          name: "Tanaman Kaktus Mini",
          price: 45000,
          image:
            "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
          rating: 4.2,
          category: "Kaktus",
        },
        {
          id: 4,
          name: "Tanaman Lidah Mertua",
          price: 95000,
          image:
            "https://images.unsplash.com/photo-1552058544-f53b5c45efb1?w=400&h=400&fit=crop",
          rating: 4.6,
          category: "Hias",
        },
      ];
      localStorage.setItem("products", JSON.stringify(demoProducts));
    }

    if (!existingUsers) {
      const demoUsers = [
        {
          id: 1,
          name: "Budi Santoso",
          email: "budi@example.com",
          phone: "081234567890",
          joined: "2024-01-15",
        },
      ];
      localStorage.setItem("users", JSON.stringify(demoUsers));
    }

    if (!existingCart) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <AppRouter />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover
        closeOnClick
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
