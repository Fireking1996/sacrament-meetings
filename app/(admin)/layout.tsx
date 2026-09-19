export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {children}
    </section>
  );
}
