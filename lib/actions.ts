'use server';

import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import {
  addMeeting,
  updateMeeting as updateMeetingDb,
  deleteMeeting as deleteMeetingDb,
} from './meetings-db';

const MeetingFormSchema = z.object({
  date: z.string().min(1, 'Please select a date.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general']),
  presiding: z.string().min(1, 'Please enter the presiding name.'),
  conducting: z.string().min(1, 'Please enter the conducting name.'),
  openingHymnTitle: z.string().min(1, 'Please enter the opening hymn title.'),
  openingHymnNumber: z.coerce.number().int().positive(
    'Please enter a valid opening hymn number.'
  ),
  openingPrayer: z.string().min(1, 'Please enter the opening prayer name.'),
  sacramentHymnTitle: z.string().min(1, 'Please enter the sacrament hymn title.'),
  sacramentHymnNumber: z.coerce.number().int().positive(
    'Please enter a valid sacrament hymn number.'
  ),
  closingHymnTitle: z.string().min(1, 'Please enter the closing hymn title.'),
  closingHymnNumber: z.coerce.number().int().positive(
    'Please enter a valid closing hymn number.'
  ),
  closingPrayer: z.string().min(1, 'Please enter the closing prayer name.'),
  stakeBusiness: z.string().optional(),
  announcements: z.string().optional(),
  speakerNames: z.string().optional(),
  speakerTopics: z.string().optional(),
});

export type State = {
  message?: string;
  errors?: Record<string, string[]>;
};

export async function createMeeting(
  prevState: State,
  formData: FormData
): Promise<State> {
      const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }
  const validatedFields = MeetingFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  try {
    await addMeeting({
      date: data.date,
      meetingType: data.meetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements: data.announcements
        ? data.announcements
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      openingHymn: {
        title: data.openingHymnTitle,
        number: data.openingHymnNumber,
      },
      openingPrayer: data.openingPrayer,
      wardBusiness: [],
      stakeBusiness: data.stakeBusiness === 'on',
      sacramentHymn: {
        title: data.sacramentHymnTitle,
        number: data.sacramentHymnNumber,
      },
      speakers: data.speakerNames
        ? data.speakerNames
            .split('\n')
            .map((name, index) => ({
              name: name.trim(),
              topic:
                data.speakerTopics?.split('\n')[index]?.trim() ?? '',
              type: 'speaker' as const,
            }))
            .filter((speaker) => speaker.name)
        : [],
      closingHymn: {
        title: data.closingHymnTitle,
        number: data.closingHymnNumber,
      },
      closingPrayer: data.closingPrayer,
    });

       revalidatePath('/meetings');
  } catch (error) {
    console.error('Failed to create meeting:', error);
    throw new Error('Something went wrong while creating the meeting.');
  }

  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: State,
  formData: FormData
): Promise<State> {
     const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }
  const validatedFields = MeetingFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: 'Please correct the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  try {
    const meeting = await updateMeetingDb(id, {
      date: data.date,
      meetingType: data.meetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements: data.announcements
        ? data.announcements
            .split('\n')
            .map((item) => item.trim())
            .filter(Boolean)
        : [],
      openingHymn: {
        title: data.openingHymnTitle,
        number: data.openingHymnNumber,
      },
      openingPrayer: data.openingPrayer,
      wardBusiness: [],
      stakeBusiness: data.stakeBusiness === 'on',
      sacramentHymn: {
        title: data.sacramentHymnTitle,
        number: data.sacramentHymnNumber,
      },
      speakers: data.speakerNames
        ? data.speakerNames
            .split('\n')
            .map((name, index) => ({
              name: name.trim(),
              topic:
                data.speakerTopics?.split('\n')[index]?.trim() ?? '',
              type: 'speaker' as const,
            }))
            .filter((speaker) => speaker.name)
        : [],
      closingHymn: {
        title: data.closingHymnTitle,
        number: data.closingHymnNumber,
      },
      closingPrayer: data.closingPrayer,
    });

    if (!meeting) {
      return {
        message: 'Meeting not found.',
      };
    }

      revalidatePath('/meetings');
    revalidatePath(`/meetings/${id}`);
  } catch (error) {
    console.error('Failed to update meeting:', error);
    throw new Error('Something went wrong while updating the meeting.');
  }

  redirect('/meetings');
}

export async function deleteMeeting(
  id: number,
  _formData: FormData
): Promise<void> {
      const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error('Unauthorized');
  }
  void _formData;

  try {
    const deleted = await deleteMeetingDb(id);

    if (!deleted) {
      throw new Error('Meeting not found.');
    }

    revalidatePath('/meetings');
    revalidatePath(`/meetings/${id}`);
  } catch (error) {
    console.error('Failed to delete meeting:', error);

    if (error instanceof Error && error.message === 'Meeting not found.') {
      throw error;
    }

    throw new Error('Something went wrong while deleting the meeting.');
  }

  redirect('/meetings');
}