'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-6"
    >
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
        >
          Previous
        </Link>
      )}

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
        >
          Next
        </Link>
      )}
    </nav>
  );
}