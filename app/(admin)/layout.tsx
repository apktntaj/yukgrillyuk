import Sidebar from "@/components/Sidebar";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Sidebar />
      <section className="content">{children}</section>
    </main>
  );
}
