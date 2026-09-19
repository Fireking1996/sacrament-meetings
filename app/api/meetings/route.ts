import { NextRequest, NextResponse } from 'next/server';

import {
  getMeetings,
  getMeetingsByDate,
} from '@/lib/meetings-db';

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');
  const query = request.nextUrl.searchParams.get('query') ?? '';
  const page = Number(request.nextUrl.searchParams.get('page')) || 1;

  if (date) {
    const meetings = await getMeetingsByDate(date);
    return NextResponse.json(meetings);
  }

  const meetings = await getMeetings(query, page);

  return NextResponse.json(meetings);
}