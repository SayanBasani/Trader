import DashboardLayout from "@/componentS/layout/DashboardLayout";
import { requireUser } from "@/lib/auth/requireUser";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const user = await requireUser();
    return (
      <div className="bg-gray-100 dark:bg-slate-950">
        <DashboardLayout user={user}>
            {children}
        </DashboardLayout>
      </div>
    );
}