import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/app/admin/Components/AdminSidebar"
import AdminHeader from "@/app/admin/Components/AdminHeader";

/**
 * Admin Layout - wraps all admin pages
 * Provides consistent sidebar and header across admin section
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get current session
  const session = await getSession();

  // This shouldn't happen (middleware should catch it), but just in case
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - fixed on the left */}
      <AdminSidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - shows user info and logout */}
        <AdminHeader userEmail={session.email} />

        {/* Page content - scrollable */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}