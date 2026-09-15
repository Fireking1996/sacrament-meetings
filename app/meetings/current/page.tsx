import { redirect } from 'next/navigation';
import { SacramentMeeting } from '@/lib/types';
import { getApiBaseUrl } from '@/lib/api-url';

async function getMeetingByDate(
  date: string
): Promise<SacramentMeeting[]> {
  const baseUrl = await getApiBaseUrl();

const response = await fetch(
  `${baseUrl}/api/meetings?date=${date}`,
  {
    cache: 'no-store',
  }
);

  if (!response.ok) {
    throw new Error('Failed to fetch meeting');
  }

  return response.json() as Promise<SacramentMeeting[]>;
}

function getMostRecentSunday(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const mostRecentSunday = new Date(today);
  mostRecentSunday.setDate(
    today.getDate() - dayOfWeek
  );

  const year = mostRecentSunday.getFullYear();
  const month = String(
    mostRecentSunday.getMonth() + 1
  ).padStart(2, '0');
  const day = String(
    mostRecentSunday.getDate()
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export default async function CurrentMeetingPage() {
  const sunday = getMostRecentSunday();
  const meetings = await getMeetingByDate(sunday);

  if (meetings.length === 0) {
    redirect('/meetings');
  }

  redirect(`/meetings/${meetings[0].id}`);
}