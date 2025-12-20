import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";

export default function AppRouter() {
  return (
    <>
      <PublicRoutes />
      <AdminRoutes />
    </>
  );
}
