import DashboardLayout from "@/componentS/layout/DashboardLayout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <div className="bg-gray-100 dark:bg-slate-950">
        <DashboardLayout>
            {children}
        </DashboardLayout>
      </div>
    );
}