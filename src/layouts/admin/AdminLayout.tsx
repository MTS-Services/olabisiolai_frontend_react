import { Outlet } from "react-router-dom";
import { AdminHeader } from "@/components/partials/admin/AdminHeader";
import { AdminSidebar } from "@/components/partials/admin/AdminSidebar";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-auth-bg text-ink">
      <AdminHeader />

      <div className="flex min-h-[calc(100vh-5rem)]">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
