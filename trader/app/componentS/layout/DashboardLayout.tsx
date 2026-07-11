import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Header />

                <main className="flex-1 overflow-y-auto p-6 bg-gray-100">

                    {children}

                </main>

            </div>

        </div>
    );
}