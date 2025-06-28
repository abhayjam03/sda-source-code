export interface ExamPattern {
  mode: string;
  duration: number;
  totalQuestions: number;
  totalMarks: number;
  subjects: [{
    name: string;
    questions: number;
    marks: number;
    topics?: string[];
  }];
  markingScheme: {
    correct: number;
    incorrect: number;
  };
  passingMarks: number;
  negativeMarking?: boolean;
}

export interface Course {
  _id?: string;
  name: string;
  code: string;
  type: 'Army' | 'Navy' | 'Air Force' | 'Paramilitary' | 'Police' | 'School';
  category: 'Foundation' | 'Intermediate' | 'Advanced' | 'Specialized';
  description: string;
  duration?: {
    months: number;
    hours: number;
  };
  fee?: {
    amount: number;
    currency: string;
    installment: boolean;
    discount: number;
  };
  examPattern: ExamPattern;
  eligibility: {
    education: string;
    age: {
      min: number;
      max: number;
    };
    physicalRequirements: string[];
    medicalRequirements?: string[];
    nationality?: string[];
  };
  syllabus?: [{
    subject: string;
    topics: string[];
    weightage: number;
  }];
  features?: string[];
  highlights?: string[];
  careerProspects?: string[];
  successRate?: number;
  isActive?: boolean;
  isPopular?: boolean;
  isFeatured?: boolean;
  images?: string[];
  brochure?: string;
  lastUpdated?: Date;
  updatedBy?: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AcademyInfo {
  _id?: string;
  name: string;
  code: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  facilities?: string[];
  capacity?: number;
  establishedYear?: number;
  isActive?: boolean;
  images?: string[];
  rating?: number;
  createdAt?: Date;
  updatedAt?: Date;
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

export interface User {
  _id?: string;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'instructor' | 'student';
  permissions?: string[];
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female' | 'other';
    profileImage?: string;
  };
  lastLogin?: Date;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Force {
  _id?: string;
  name: string;
  type: 'Army' | 'Navy' | 'Air Force' | 'Paramilitary' | 'Police';
  description: string;
  headquarters: string;
  establishedYear: number;
  strength: number;
  isActive?: boolean;
  logo?: string;
  images?: string[];
  requirements: {
    age: {
      min: number;
      max: number;
    };
    education: string[];
    physicalStandards: string[];
    medicalStandards: string[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export interface School {
  _id?: string;
  name: string;
  type: 'Army' | 'Navy' | 'Air Force' | 'Paramilitary' | 'Police';
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  establishedYear?: number;
  isActive?: boolean;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
} 