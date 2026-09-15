import NavLinks from '@/components/NavLinks';

export default function MeetingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <NavLinks />
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}