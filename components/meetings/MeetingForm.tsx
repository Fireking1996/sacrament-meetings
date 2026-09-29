'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import type { SacramentMeeting } from '@/lib/types';
import type { State } from '@/lib/actions';

interface MeetingFormProps {
  action: (
    prevState: State,
    formData: FormData
  ) => Promise<State>;
  meeting?: SacramentMeeting;
  submitLabel: string;
  pendingLabel: string;
}

function FieldError({
  id,
  errors,
}: {
  id: string;
  errors?: string[];
}) {
  return (
    <div
      id={id}
      aria-live="polite"
      className="mt-1 text-sm text-red-600"
    >
      {errors?.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}

export default function MeetingForm({
  action,
  meeting,
  submitLabel,
  pendingLabel,
}: MeetingFormProps) {
  const initialState: State = {
    message: '',
    errors: {},
  };

  const [state, formAction, isPending] = useActionState(
    action,
    initialState
  );

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
        Admin
      </p>

      <form action={formAction} className="mt-8 space-y-8">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
              defaultValue={meeting?.date ?? ''}
            aria-describedby="date-error"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
          <FieldError id="date-error" errors={state.errors?.date} />
        </div>

        <div>
          <label
            htmlFor="meetingType"
            className="block text-sm font-medium text-gray-700"
          >
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
             defaultValue={meeting?.meetingType ?? 'regular'}
            aria-describedby="meetingType-error"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          >
            <option value="testimony">Testimony</option>
            <option value="regular">Regular</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <FieldError
            id="meetingType-error"
            errors={state.errors?.meetingType}
          />
        </div>

        <div>
          <label
            htmlFor="presiding"
            className="block text-sm font-medium text-gray-700"
          >
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
              defaultValue={meeting?.presiding ?? ''}
            aria-describedby="presiding-error"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
          <FieldError
            id="presiding-error"
            errors={state.errors?.presiding}
          />
        </div>

        <div>
          <label
            htmlFor="conducting"
            className="block text-sm font-medium text-gray-700"
          >
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
              defaultValue={meeting?.conducting ?? ''}
            aria-describedby="conducting-error"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
          <FieldError
            id="conducting-error"
            errors={state.errors?.conducting}
          />
        </div>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900">
            Opening
          </legend>

          <div>
            <label
              htmlFor="openingHymnTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Opening Hymn
            </label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              type="text"
              placeholder="Hymn title"
              defaultValue={meeting?.openingHymn.title ?? ''}
              aria-describedby="openingHymnTitle-error"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
            <FieldError
              id="openingHymnTitle-error"
              errors={state.errors?.openingHymnTitle}
            />
          </div>

          <div>
            <label
              htmlFor="openingHymnNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Opening Hymn Number
            </label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting?.openingHymn.number ?? ''}
              aria-describedby="openingHymnNumber-error"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
            <FieldError
              id="openingHymnNumber-error"
              errors={state.errors?.openingHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="openingPrayer"
              className="block text-sm font-medium text-gray-700"
            >
              Opening Prayer
            </label>
            <input
              id="openingPrayer"
              name="openingPrayer"
              type="text"
              defaultValue={meeting?.openingPrayer ?? ''}
              aria-describedby="openingPrayer-error"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
            <FieldError
              id="openingPrayer-error"
              errors={state.errors?.openingPrayer}
            />
          </div>
        </fieldset>

        <div>
          <label
            htmlFor="announcements"
            className="block text-sm font-medium text-gray-700"
          >
            Announcements
          </label>
          <textarea
            id="announcements"
            name="announcements"
            rows={4}
            defaultValue={meeting?.announcements?.join('\n') ?? ''}
            placeholder="One announcement per line"
            aria-describedby="announcements-error"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
          />
          <FieldError
            id="announcements-error"
            errors={state.errors?.announcements}
          />
        </div>

        <div>
          <label
            htmlFor="stakeBusiness"
            className="flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <input
              id="stakeBusiness"
              name="stakeBusiness"
              type="checkbox"
              defaultChecked={meeting?.stakeBusiness ?? false}
              aria-describedby="stakeBusiness-error"
            />
            Stake business
          </label>
          <FieldError
            id="stakeBusiness-error"
            errors={state.errors?.stakeBusiness}
          />
        </div>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900">
            Sacrament
          </legend>

          <div>
            <label
              htmlFor="sacramentHymnTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Sacrament Hymn
            </label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              type="text"
              placeholder="Hymn title"
              defaultValue={meeting?.sacramentHymn.title ?? ''}
              aria-describedby="sacramentHymnTitle-error"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
            <FieldError
              id="sacramentHymnTitle-error"
              errors={state.errors?.sacramentHymnTitle}
            />
          </div>

          <div>
            <label
              htmlFor="sacramentHymnNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Sacrament Hymn Number
            </label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting?.sacramentHymn.number ?? ''}
              aria-describedby="sacramentHymnNumber-error"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
            <FieldError
              id="sacramentHymnNumber-error"
              errors={state.errors?.sacramentHymnNumber}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900">
            Speakers
          </legend>

          <div>
            <label
              htmlFor="speakerNames"
              className="block text-sm font-medium text-gray-700"
            >
              Speaker Names
            </label>
            <textarea
              id="speakerNames"
              name="speakerNames"
              rows={4}
              defaultValue={
  meeting?.speakers
    .filter((speaker) => speaker.type === 'speaker')
    .map((speaker) => speaker.name)
    .join('\n') ?? ''
}
              placeholder="One speaker per line"
              aria-describedby="speakerNames-error"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
            <FieldError
              id="speakerNames-error"
              errors={state.errors?.speakerNames}
            />
          </div>

          <div>
            <label
              htmlFor="speakerTopics"
              className="block text-sm font-medium text-gray-700"
            >
              Speaker Topics
            </label>
            <textarea
              id="speakerTopics"
              name="speakerTopics"
              rows={4}
              defaultValue={
  meeting?.speakers
    .filter((speaker) => speaker.type === 'speaker')
    .map((speaker) => speaker.topic)
    .join('\n') ?? ''
}
              placeholder="One topic per line, matching the speakers"
              aria-describedby="speakerTopics-error"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
            <FieldError
              id="speakerTopics-error"
              errors={state.errors?.speakerTopics}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-gray-900">
            Closing
          </legend>

          <div>
            <label
              htmlFor="closingHymnTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Closing Hymn
            </label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              type="text"
              defaultValue={meeting?.closingHymn.title ?? ''}
              placeholder="Hymn title"
              aria-describedby="closingHymnTitle-error"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
            <FieldError
              id="closingHymnTitle-error"
              errors={state.errors?.closingHymnTitle}
            />
          </div>

          <div>
            <label
              htmlFor="closingHymnNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Closing Hymn Number
            </label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              min="1"
              defaultValue={meeting?.closingHymn.number ?? ''}
              aria-describedby="closingHymnNumber-error"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
            <FieldError
              id="closingHymnNumber-error"
              errors={state.errors?.closingHymnNumber}
            />
          </div>

          <div>
            <label
              htmlFor="closingPrayer"
              className="block text-sm font-medium text-gray-700"
            >
              Closing Prayer
            </label>
            <input
              id="closingPrayer"
              name="closingPrayer"
              type="text"
              defaultValue={meeting?.closingPrayer ?? ''}
              aria-describedby="closingPrayer-error"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900"
            />
            <FieldError
              id="closingPrayer-error"
              errors={state.errors?.closingPrayer}
            />
          </div>
        </fieldset>

        {state.message && (
          <p
            aria-live="polite"
            className="rounded-md bg-red-50 p-3 text-sm text-red-700"
          >
            {state.message}
          </p>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? pendingLabel : submitLabel}
          </button>

          <Link
  href="/meetings"
  className="rounded-md border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-100"
>
  Cancel
</Link>
        </div>
      </form>
    </section>
  );
}