import { Sidebar } from "@/components/layout/sidebar";
import { authProviderServer } from "@providers/auth-provider";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authenticated } = await authProviderServer.check();

  if (!authenticated) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
} 