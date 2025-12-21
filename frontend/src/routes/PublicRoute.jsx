import { Navigate } from "react-router-dom";
import { useSessionStore } from "../stores/session.store";

export default function PublicRoute({ children }) {
  const { session, loading, initialized } = useSessionStore();

  if (!initialized || loading) {
    return <div>Loading...</div>;
  }

  // ✅ sudah login → tendang ke dashboard
  if (session) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
