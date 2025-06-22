import { Course } from '../types/academy';

export const featuredCourses: Course[] = [
  {
    title: 'NDA Foundation',
    description: 'Comprehensive preparation for NDA entrance examination with expert guidance.',
    examPattern: {
      mode: 'Online',
      duration: '12 months',
      totalQuestions: 150,
      totalMarks: 300,
      subjects: {
        'Mathematics': 100,
        'General Ability': 200
      },
      markingScheme: '+2 for correct, -0.66 for incorrect',
      passingMarks: 180
    }
  },
  {
    title: 'CDS/OTA',
    description: 'Specialized coaching for Combined Defence Services and Officer Training Academy.',
    examPattern: {
      mode: 'Online',
      duration: '6 months',
      totalQuestions: 120,
      totalMarks: 300,
      subjects: {
        'English': 100,
        'General Knowledge': 100,
        'Elementary Mathematics': 100
      },
      markingScheme: '+2.5 for correct, -0.83 for incorrect',
      passingMarks: 150
    }
  },
  {
    title: 'AFCAT',
    description: 'Air Force Common Admission Test preparation with experienced faculty.',
    examPattern: {
      mode: 'Online',
      duration: '4 months',
      totalQuestions: 100,
      totalMarks: 300,
      subjects: {
        'General Awareness': 100,
        'Verbal Ability': 100,
        'Numerical Ability': 100
      },
      markingScheme: '+3 for correct, -1 for incorrect',
      passingMarks: 150
    }
  }
];

export const allCourses: Course[] = [
  {
    title: 'NDA Foundation',
    description: 'Comprehensive preparation for NDA entrance examination with expert guidance.',
    examPattern: {
      mode: 'Online',
      duration: '12 months',
      totalQuestions: 150,
      totalMarks: 300,
      subjects: {
        'Mathematics': 100,
        'General Ability': 200
      },
      markingScheme: '+2 for correct, -0.66 for incorrect',
      passingMarks: 180
    }
  },
  {
    title: 'CDS/OTA',
    description: 'Specialized coaching for Combined Defence Services and Officer Training Academy.',
    examPattern: {
      mode: 'Online',
      duration: '6 months',
      totalQuestions: 120,
      totalMarks: 300,
      subjects: {
        'English': 100,
        'General Knowledge': 100,
        'Elementary Mathematics': 100
      },
      markingScheme: '+2.5 for correct, -0.83 for incorrect',
      passingMarks: 150
    }
  },
  {
    title: 'AFCAT',
    description: 'Air Force Common Admission Test preparation with experienced faculty.',
    examPattern: {
      mode: 'Online',
      duration: '4 months',
      totalQuestions: 100,
      totalMarks: 300,
      subjects: {
        'General Awareness': 100,
        'Verbal Ability': 100,
        'Numerical Ability': 100
      },
      markingScheme: '+3 for correct, -1 for incorrect',
      passingMarks: 150
    }
  },
  {
    title: 'SSB Interview',
    description: 'Comprehensive training for SSB interview with mock sessions and feedback.',
    examPattern: {
      mode: 'Offline',
      duration: '2 months',
      totalQuestions: 0,
      totalMarks: 0,
      subjects: {
        'Psychology': 0,
        'GTO Tasks': 0,
        'Personal Interview': 0
      },
      markingScheme: 'Qualitative Assessment',
      passingMarks: 'Recommended'
    }
  },
  {
    title: 'CAPF',
    description: 'Preparation for Central Armed Police Forces examination.',
    examPattern: {
      mode: 'Online',
      duration: '6 months',
      totalQuestions: 125,
      totalMarks: 250,
      subjects: {
        'General Intelligence': 50,
        'General Studies': 50,
        'Elementary Mathematics': 50,
        'English': 50
      },
      markingScheme: '+2 for correct, -0.66 for incorrect',
      passingMarks: 125
    }
  },
  {
    title: 'MNS',
    description: 'Military Nursing Service examination preparation.',
    examPattern: {
      mode: 'Online',
      duration: '4 months',
      totalQuestions: 150,
      totalMarks: 300,
      subjects: {
        'General English': 100,
        'Biology': 100,
        'Physics': 50,
        'Chemistry': 50
      },
      markingScheme: '+2 for correct, -0.66 for incorrect',
      passingMarks: 150
    }
  }
]; 