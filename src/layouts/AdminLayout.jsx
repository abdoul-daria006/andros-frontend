import { Outlet } from "react-router-dom";

import Sidebar from "../components/Admin/Sidebar";
import AdminHeader from "../components/Admin/AdminHeader";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <AdminHeader />

        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;