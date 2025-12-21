import { Navigate } from "react-router-dom";
import { useSessionStore } from "../stores/session.store";

export default function ProtectedRoute({ children }) {
  const { session, loading, initialized } = useSessionStore();

  // Tunggu /me selesai
  if (!initialized || loading) {
    return <div>Loading...</div>;
  }

  // Belum login → keluar
  if (!session) {
    return <Navigate to="/masuk" replace />;
  }

  return children;
}
