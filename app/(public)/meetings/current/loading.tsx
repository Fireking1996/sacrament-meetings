export default function Loading() {
  return (
    <div
      className="flex min-h-64 items-center justify-center"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
          aria-hidden="true"
        />

        <p className="mt-4 text-sm font-medium text-gray-600">
          Loading meetings...
        </p>
      </div>
    </div>
  );
}