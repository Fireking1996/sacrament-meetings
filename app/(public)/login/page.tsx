'use client';

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const formData = new FormData(event.currentTarget);

    const result = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid username or password.');
      return;
    }

    router.push('/meetings/new');
  }

  return (
    <section className="mx-auto max-w-md">
      <h1 className="text-3xl font-bold text-gray-900">
        Bishopric Login
      </h1>

      <p className="mt-2 text-gray-600">
        Sign in to manage sacrament meeting schedules.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>

          <input
            id="username"
            name="username"
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="text-sm font-medium text-red-600"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </section>
  );
}