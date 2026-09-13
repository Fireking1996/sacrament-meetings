import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Cedar Grove Ward
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Sacrament Meeting Planner
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
          View upcoming and past sacrament meetings, including
          announcements, hymns, prayers, ward business, speakers,
          and other meeting details.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/meetings/current"
            className="rounded-md bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            View Current Meeting
          </Link>

          <Link
            href="/meetings"
            className="rounded-md border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-700 hover:bg-gray-100"
          >
            View All Meetings
          </Link>
        </div>
      </div>
    </section>
  );
}