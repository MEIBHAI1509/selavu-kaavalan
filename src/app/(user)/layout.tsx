import Sidebar from "@/components/dashboard/sidebar";
import Topbar from "@/components/dashboard/topbar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />

      <main className="min-h-screen lg:ml-72">
        <Topbar />

        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </>
  );
}