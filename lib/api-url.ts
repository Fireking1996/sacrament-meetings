import { headers } from 'next/headers';

export async function getApiBaseUrl(): Promise<string> {
  const requestHeaders = await headers();

  const host =
    requestHeaders.get('x-forwarded-host') ??
    requestHeaders.get('host');

  const protocol =
    requestHeaders.get('x-forwarded-proto') ?? 'http';

  if (!host) {
    throw new Error('Unable to determine application host');
  }

  return `${protocol}://${host}`;
}