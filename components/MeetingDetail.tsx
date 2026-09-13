'use client';

import { SacramentMeeting } from '@/lib/types';
interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T12:00:00`
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
  <article className="...">
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print mb-6 rounded-md bg-gray-800 px-4 py-2 font-medium text-white hover:bg-gray-900"
    >
      Print Meeting
    </button>

    {/* The rest of your meeting content */}
      <header className="border-b pb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          {meeting.meetingType} Meeting
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          {formattedDate}
        </h1>

        <div className="mt-4 grid gap-2 text-gray-700 sm:grid-cols-2">
          <p>
            <span className="font-semibold">Presiding:</span>{' '}
            {meeting.presiding}
          </p>

          <p>
            <span className="font-semibold">Conducting:</span>{' '}
            {meeting.conducting}
          </p>
        </div>
      </header>

      {meeting.announcements &&
        meeting.announcements.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Announcements
            </h2>

            <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
              {meeting.announcements.map((announcement) => (
                <li key={announcement}>{announcement}</li>
              ))}
            </ul>
          </section>
        )}

      <section className="rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Opening
        </h2>

        <div className="mt-4 space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Opening Hymn:</span>{' '}
            #{meeting.openingHymn.number} —{' '}
            {meeting.openingHymn.title}
          </p>

          <p>
            <span className="font-semibold">Opening Prayer:</span>{' '}
            {meeting.openingPrayer}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900">
          Ward Business
        </h2>

        {meeting.wardBusiness.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-700">
            {meeting.wardBusiness.map((item) => (
              <li key={item.description}>
                {item.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-gray-600">
            No ward business scheduled.
          </p>
        )}

        <p className="mt-4 text-gray-700">
          <span className="font-semibold">Stake Business:</span>{' '}
          {meeting.stakeBusiness ? 'Yes' : 'No'}
        </p>
      </section>

      <section className="rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Sacrament
        </h2>

        <p className="mt-4 text-gray-700">
          <span className="font-semibold">Sacrament Hymn:</span>{' '}
          #{meeting.sacramentHymn.number} —{' '}
          {meeting.sacramentHymn.title}
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-gray-900">
          Speakers & Musical Numbers
        </h2>

        {meeting.speakers.length > 0 ? (
          <div className="mt-4 space-y-4">
            {meeting.speakers.map((item) => (
              <div
                key={`${item.type}-${item.name}`}
                className="rounded-lg border p-4"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  {item.type === 'speaker'
                    ? 'Speaker'
                    : 'Musical Number'}
                </p>

                <h3 className="mt-1 font-bold text-gray-900">
                  {item.name}
                </h3>

                <p className="mt-1 text-gray-700">
                  {item.topic}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-gray-600">
            No speakers or musical numbers scheduled.
          </p>
        )}
      </section>

      <section className="rounded-lg bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Closing
        </h2>

        <div className="mt-4 space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Closing Hymn:</span>{' '}
            #{meeting.closingHymn.number} —{' '}
            {meeting.closingHymn.title}
          </p>

          <p>
            <span className="font-semibold">Closing Prayer:</span>{' '}
            {meeting.closingPrayer}
          </p>
        </div>
      </section>
    </article>
  );
}