import Link from 'next/link';
import MeetingDetail from '@/components/MeetingDetail';
import { SacramentMeeting } from '@/lib/types';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

async function getMeeting(
  id: string
): Promise<SacramentMeeting> {
  const response = await fetch(
    `http://localhost:3000/api/meetings/${id}`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Meeting not found');
  }

  return response.json() as Promise<SacramentMeeting>;
}

export default async function MeetingPage({
  params,
}: MeetingPageProps) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  return (
    <section>
      <div className="mb-6">
        <Link
          href="/meetings"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Back to All Meetings
        </Link>
      </div>

      <MeetingDetail meeting={meeting} />
    </section>
  );
}