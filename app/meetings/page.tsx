import MeetingCard from '@/components/MeetingCard';
import { SacramentMeeting } from '@/lib/types';

async function getMeetings(): Promise<SacramentMeeting[]> {
  const response = await fetch(
    'http://localhost:3000/api/meetings',
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch meetings');
  }

  return response.json() as Promise<SacramentMeeting[]>;
}

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <section>
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Cedar Grove Ward
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Sacrament Meetings
        </h1>

        <p className="mt-2 text-gray-600">
          View current and past sacrament meeting programs.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </section>
  );
}