import { ImageResponse } from 'next/og';

export const alt = 'Sacrament Meeting Planner';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f9fafb',
          color: '#111827',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            color: '#2563eb',
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          Cedar Grove Ward
        </div>

        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
          }}
        >
          Sacrament Meeting Planner
        </div>

        <div
          style={{
            color: '#4b5563',
            fontSize: 30,
            marginTop: 24,
          }}
        >
          View current and past sacrament meeting programs.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}