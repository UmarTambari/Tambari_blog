import { AuthProvider } from "@/lib/auth/AuthContext";
import AdminNav from "@/components/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <AdminNav />
        <main>{children}</main>
      </div>
    </AuthProvider>
  );
}
