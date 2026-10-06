import Link from 'next/link';
import { notFound } from 'next/navigation';

import MeetingForm from '@/components/meetings/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId)) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  const updateAction = updateMeeting.bind(null, meetingId);

  return (
    <section>
      <Link
        href={`/meetings/${meetingId}`}
        className="text-sm font-semibold text-blue-600 hover:underline"
      >
        ← Back to Meeting
      </Link>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-blue-600">
        Admin
      </p>

      <h1 className="mt-2 text-3xl font-bold text-gray-900">
        Edit Meeting
      </h1>

      <MeetingForm
        action={updateAction}
        meeting={meeting}
        submitLabel="Save Changes"
        pendingLabel="Saving..."
      />
    </section>
  );
}