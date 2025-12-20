import { Routes, Route } from "react-router-dom";

import AdminDashboard from "../pages/admin/Dashboard";
import AdminProducts from "../pages/admin/Products";
import AdminUsers from "../pages/admin/Users";
import AdminNotifications from "../pages/admin/Notifications";
import AdminSidebar from "../components/AdminSidebar";
import AdminEducations from "../pages/admin/Educations";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/admin/dashboard"
        element={
          <AdminSidebar>
            <AdminDashboard />
          </AdminSidebar>
        }
      />
      <Route
        path="/admin/products"
        element={
          <AdminSidebar>
            <AdminProducts />
          </AdminSidebar>
        }
      />
      <Route
        path="/admin/educations"
        element={
          <AdminSidebar>
            <AdminEducations />
          </AdminSidebar>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminSidebar>
            <AdminUsers />
          </AdminSidebar>
        }
      />
      <Route
        path="/admin/notifications"
        element={
          <AdminSidebar>
            <AdminNotifications />
          </AdminSidebar>
        }
      />
    </Routes>
  );
}
