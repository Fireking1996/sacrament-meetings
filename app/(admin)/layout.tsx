import { authOptions } from '@/auth';
import SignOutButton from '@/components/auth/SignOutButton';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between border-b pb-4">
        <p className="text-sm text-gray-600">
          Signed in as{' '}
          <span className="font-semibold">
            {session.user?.name ?? 'Bishopric'}
          </span>
        </p>

        <SignOutButton />
      </div>

      {children}
    </section>
  );
}