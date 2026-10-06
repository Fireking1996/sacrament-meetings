import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/auth';
import SignOutButton from '@/components/auth/SignOutButton';

export default async function Header() {
  const session = await getServerSession(authOptions);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Sacrament Meeting Planner
          </h1>

          <p className="text-sm text-gray-600">
            Cedar Grove Ward
          </p>

          <p className="text-sm text-gray-500">
            {currentDate}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/meetings"
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Meetings
          </Link>

          {session ? (
            <SignOutButton />
          ) : (
            <Link
              href="/login"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Bishopric Login
            </Link>
          )}

          <Image
            src="/next.svg"
            alt="Sacrament Meeting Planner"
            width={120}
            height={28}
            style={{ width: 'auto', height: '28px' }}
          />
        </div>
      </div>
    </header>
  );
}