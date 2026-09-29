import Link from 'next/link';

import { deleteMeeting } from '@/lib/actions';
import { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(
    `${meeting.date}T12:00:00`
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const deleteAction = deleteMeeting.bind(null, meeting.id);

  return (
    <article className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="mb-4">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
          {meeting.meetingType} Meeting
        </p>

        <h2 className="mt-1 text-xl font-bold text-gray-900">
          {formattedDate}
        </h2>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Presiding:</span>{' '}
          {meeting.presiding}
        </p>

        <p>
          <span className="font-semibold">Conducting:</span>{' '}
          {meeting.conducting}
        </p>

        <p>
          <span className="font-semibold">Opening Hymn:</span>{' '}
          #{meeting.openingHymn.number} — {meeting.openingHymn.title}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/meetings/${meeting.id}`}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          View Meeting
        </Link>

        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="rounded-md border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
        >
          Edit
        </Link>

        <form action={deleteAction}>
          <button
            type="submit"
            className="rounded-md border border-red-300 px-4 py-2 font-medium text-red-700 hover:bg-red-50"
          >
            Delete
          </button>
        </form>
      </div>
    </article>
  );
}