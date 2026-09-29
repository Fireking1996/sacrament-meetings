'use client';

import MeetingForm from '@/components/meetings/MeetingForm';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Admin
      </p>

      <h1 className="mt-2 text-3xl font-bold text-gray-900">
        Create Meeting
      </h1>

      <MeetingForm
        action={createMeeting}
        submitLabel="Create Meeting"
        pendingLabel="Creating..."
      />
    </section>
  );
}