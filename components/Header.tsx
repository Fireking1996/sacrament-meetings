import Image from 'next/image';

export default function Header() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Sacrament Meeting Planner
          </h1>

          <p className="text-sm text-gray-600">
            Cedar Grove Ward
          </p>

          <p className="text-sm text-gray-500">
            {currentDate}
          </p>
        </div>

        <Image
            src="/next.svg"
            alt="Sacrament Meeting Planner"
            width={120}
            height={28}
            style={{ width: 'auto', height: '28px' }}

        />
      </div>
    </header>
  );
}