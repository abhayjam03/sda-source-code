export interface Course {
  id: number
  title: string
  description: string
  image: string
  href: string
  duration?: string
  level?: string
}

export const featuredCourses: Course[] = [
  {
    id: 1,
    title: 'NDA Foundation',
    description: 'Comprehensive preparation for NDA entrance examination with expert guidance.',
    image: '/courses/nda-foundation.jpg',
    href: '/courses/nda-foundation',
  },
  {
    id: 2,
    title: 'CDS/OTA',
    description: 'Specialized coaching for Combined Defence Services and Officer Training Academy.',
    image: '/courses/cds.jpg',
    href: '/courses/cds',
  },
  {
    id: 3,
    title: 'AFCAT',
    description: 'Air Force Common Admission Test preparation with experienced faculty.',
    image: '/courses/afcat.jpg',
    href: '/courses/afcat',
  },
]

export const allCourses: Course[] = [
  {
    id: 1,
    title: 'NDA Foundation',
    description: 'Comprehensive preparation for NDA entrance examination with expert guidance.',
    image: '/courses/nda-foundation.jpg',
    href: '/courses/nda-foundation',
    duration: '12 months',
    level: 'Beginner',
  },
  {
    id: 2,
    title: 'CDS/OTA',
    description: 'Specialized coaching for Combined Defence Services and Officer Training Academy.',
    image: '/courses/cds.jpg',
    href: '/courses/cds',
    duration: '6 months',
    level: 'Intermediate',
  },
  {
    id: 3,
    title: 'AFCAT',
    description: 'Air Force Common Admission Test preparation with experienced faculty.',
    image: '/courses/afcat.jpg',
    href: '/courses/afcat',
    duration: '4 months',
    level: 'Intermediate',
  },
  {
    id: 4,
    title: 'SSB Interview',
    description: 'Comprehensive training for SSB interview with mock sessions and feedback.',
    image: '/courses/ssb.jpg',
    href: '/courses/ssb',
    duration: '2 months',
    level: 'Advanced',
  },
  {
    id: 5,
    title: 'CAPF',
    description: 'Preparation for Central Armed Police Forces examination.',
    image: '/courses/capf.jpg',
    href: '/courses/capf',
    duration: '6 months',
    level: 'Intermediate',
  },
  {
    id: 6,
    title: 'MNS',
    description: 'Military Nursing Service examination preparation.',
    image: '/courses/mns.jpg',
    href: '/courses/mns',
    duration: '4 months',
    level: 'Intermediate',
  },
] 