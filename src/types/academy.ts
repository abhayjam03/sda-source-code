export interface ExamPattern {
  mode: string;
  duration: string;
  totalQuestions: number;
  totalMarks: number;
  subjects: {
    [key: string]: number;
  };
  markingScheme: string;
  passingMarks: string | number;
}

export interface Course {
  title: string;
  description: string;
  examPattern: ExamPattern;
}

export interface AcademyInfo {
  name: string;
  location: string;
  overview: string;
  contact: string;
  courses: Course[];
}

export interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
} 