import { AcademyInfo, Course, HeroSection, Testimonial, Feature } from '../types/academy';

// Mock data based on data.txt
const mockAcademyInfo: AcademyInfo = {
  name: "Surya Defence Academy",
  location: "Pathankot",
  overview: "Surya Defence Academy, located in Pathankot, is a leading institute dedicated to grooming aspirants for various defense and paramilitary Forces recruitment exams. The academy provides expert coaching for Army, Agniveer GD / CLERK / TECHNICAL / TRADESMAN and Nursing Assistant, SSC (GD), CRPF, CISF, BSF, ITBP, All state police forces and Sanik / Military school.",
  contact: "7355666622",
  courses: [
    {
      title: "Agniveer GD",
      description: "This role involves frontline combat responsibilities, requiring physical fitness, discipline, and teamwork. Soldiers in GD play a crucial role in defending the nation and executing missions with courage and dedication.",
      examPattern: {
        mode: "Online (Computer-Based)",
        duration: "60 minutes",
        totalQuestions: 50,
        totalMarks: 100,
        subjects: {
          "General Knowledge": 15,
          "General Science": 15,
          "Mathematics": 15,
          "Logical Reasoning": 5
        },
        markingScheme: "+2 for correct answers, -0.5 for incorrect answers",
        passingMarks: 35
      }
    },
    // Add more courses as needed
  ]
};

const mockHeroSection: HeroSection = {
  title: "Surya Defence Academy",
  subtitle: "Pathankot",
  description: "Your Gateway to Defence Services",
  image: "/images/placeholder-hero.jpg"
};

const mockTestimonials: Testimonial[] = [
  {
    name: "John Doe",
    role: "Army Officer",
    content: "Surya Defence Academy provided me with excellent training and guidance to achieve my dream of joining the Indian Army.",
    image: "/images/testimonials/testimonial-1.jpg"
  },
  // Add more testimonials
];

const mockFeatures: Feature[] = [
  {
    title: "Expert Training",
    description: "Comprehensive training in both physical and written aspects of defence exams",
    icon: "training"
  },
  {
    title: "Modern Facilities",
    description: "State-of-the-art infrastructure for optimal learning experience",
    icon: "facilities"
  },
  {
    title: "Experienced Faculty",
    description: "Learn from retired defence personnel and subject matter experts",
    icon: "faculty"
  }
];

// Mock API functions
export const getAcademyInfo = async (): Promise<AcademyInfo> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAcademyInfo;
};

export const getHeroSection = async (): Promise<HeroSection> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockHeroSection;
};

export const getTestimonials = async (): Promise<Testimonial[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockTestimonials;
};

export const getFeatures = async (): Promise<Feature[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockFeatures;
};

export const getCourses = async (): Promise<Course[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAcademyInfo.courses;
}; 