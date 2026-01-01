import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import AdminUsers from "../pages/admin/Users";
// import AdminNotifications from "../pages/admin/Notifications";
import AdminEducations from "../pages/admin/Educations";
import AdminSidebar from "../components/AdminSidebar";
import AdminTransactions from "../pages/admin/Transactions";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminSidebar />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="educations" element={<AdminEducations />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="transactions" element={<AdminTransactions />} />
        {/* <Route path="notifications" element={<AdminNotifications />} /> */}
      </Route>
    </Routes>
  );
}
