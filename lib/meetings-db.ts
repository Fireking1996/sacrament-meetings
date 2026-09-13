import { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-08-16',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Carter',
    conducting: 'Brother Michael Adams',
    announcements: [
      'Youth activity this Wednesday at 6:30 PM.',
      'Relief Society activity next Saturday.'
    ],
    openingHymn: {
      number: 227,
      title: 'There Is Sunshine in My Soul Today'
    },
    openingPrayer: 'Brother James Wilson',
    wardBusiness: [
      {
        description: 'Sustaining new Primary teachers.'
      }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'As Now We Take the Sacrament'
    },
    speakers: [
      {
        name: 'Sister Emily Carter',
        topic: 'Following Jesus Christ',
        type: 'speaker'
      },
      {
        name: 'Brother Thomas Reed',
        topic: 'Serving in the Ward',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 85,
      title: 'How Firm a Foundation'
    },
    closingPrayer: 'Brother David Young'
  },
  {
    id: 2,
    date: '2026-08-23',
    meetingType: 'testimony',
    presiding: 'Bishop Daniel Carter',
    conducting: 'Sister Rachel Adams',
    announcements: [
      'Temple recommend interviews are available this week.'
    ],
    openingHymn: {
      number: 2,
      title: 'The Spirit of God'
    },
    openingPrayer: 'Sister Laura Smith',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 193,
      title: 'I Stand All Amazed'
    },
    speakers: [],
    closingHymn: {
      number: 219,
      title: 'Because I Have Been Given Much'
    },
    closingPrayer: 'Brother John Miller'
  },
  {
    id: 3,
    date: '2026-08-30',
    meetingType: 'stake',
    presiding: 'President Robert Harris',
    conducting: 'Brother Mark Lewis',
    announcements: [
      'Stake youth conference registration is now open.'
    ],
    openingHymn: {
      number: 85,
      title: 'How Firm a Foundation'
    },
    openingPrayer: 'Sister Rebecca Hall',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 169,
      title: 'As Now We Take the Sacrament'
    },
    speakers: [
      {
        name: 'President Robert Harris',
        topic: 'Strengthening Families',
        type: 'speaker'
      },
      {
        name: 'Sister Amanda Brooks',
        topic: 'Faith in Jesus Christ',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 270,
      title: 'I’ll Go Where You Want Me to Go'
    },
    closingPrayer: 'Brother Peter Clark'
  },
  {
    id: 4,
    date: '2026-09-06',
    meetingType: 'regular',
    presiding: 'Bishop Daniel Carter',
    conducting: 'Brother Michael Adams',
    announcements: [
      'Ward picnic will be held next Sunday after meetings.',
      'Please remember to sign up for ministering interviews.'
    ],
    openingHymn: {
      number: 30,
      title: 'Come, Come, Ye Saints'
    },
    openingPrayer: 'Brother James Wilson',
    wardBusiness: [
      {
        description: 'Sustaining new ministering assignments.'
      }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 169,
      title: 'As Now We Take the Sacrament'
    },
    speakers: [
      {
        name: 'Brother Daniel Green',
        topic: 'Covenants and Discipleship',
        type: 'speaker'
      },
      {
        name: 'Sister Hannah White',
        topic: 'Finding Peace Through the Savior',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 239,
      title: 'Choose the Right'
    },
    closingPrayer: 'Sister Rachel Adams'
  },
  {
    id: 5,
    date: '2026-09-13',
    meetingType: 'general',
    presiding: 'Bishop Daniel Carter',
    conducting: 'Sister Rachel Adams',
    announcements: [
      'General conference broadcast will be available in the meetinghouse.'
    ],
    openingHymn: {
      number: 227,
      title: 'There Is Sunshine in My Soul Today'
    },
    openingPrayer: 'Brother David Young',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 193,
      title: 'I Stand All Amazed'
    },
    speakers: [
      {
        name: 'Brother Michael Adams',
        topic: 'Hear Him',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 219,
      title: 'Because I Have Been Given Much'
    },
    closingPrayer: 'Sister Laura Smith'
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (!date) {
    return meetings;
  }

  return meetings.filter((meeting) => meeting.date === date);
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}