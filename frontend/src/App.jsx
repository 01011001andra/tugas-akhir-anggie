import { useEffect } from "react";
import AppRouter from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSessionStore } from "./stores/session.store";
import { useCartStore } from "./stores/cart.store";
import { getMyCart } from "./services/cart.service";

function App() {
  const getMe = useSessionStore((s) => s.getMe);
  const markInitialized = useSessionStore((s) => s.markInitialized);

  useEffect(() => {
    const initApp = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        // ❌ tidak login
        markInitialized();
        return;
      }

      try {
        // ✅ 1. ambil user
        await getMe();

        // ✅ 2. ambil cart SETELAH user siap
        const { data } = await getMyCart();
        console.log(data);
        // ✅ 3. set cart ke zustand
        useCartStore.getState().setFromApi(data?.items || []);
      } catch (err) {
        console.error("Init app failed:", err);

        // fallback aman
        useCartStore.getState().clear();
      } finally {
        // ✅ 4. tandai app siap
        markInitialized();
      }
    };

    initApp();
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
