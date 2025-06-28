'use client'

import { Course } from '../types/academy';

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group rounded-lg bg-background p-6 shadow-brand border border-border transition-all hover:shadow-brand-lg">
      <h3 className="mb-4 text-2xl font-bold text-foreground">{course.title}</h3>
      <p className="mb-6 text-foreground-secondary">{course.description}</p>
      
      <div className="rounded-md bg-background-tertiary p-4 border border-border-secondary">
        <h4 className="mb-2 font-semibold text-foreground">Exam Pattern</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium text-foreground">Mode:</span> 
            <span className="text-foreground-secondary"> {course.examPattern.mode}</span>
          </div>
          <div>
            <span className="font-medium text-foreground">Duration:</span> 
            <span className="text-foreground-secondary"> {course.examPattern.duration}</span>
          </div>
          <div>
            <span className="font-medium text-foreground">Total Questions:</span> 
            <span className="text-foreground-secondary"> {course.examPattern.totalQuestions}</span>
          </div>
          <div>
            <span className="font-medium text-foreground">Total Marks:</span> 
            <span className="text-foreground-secondary"> {course.examPattern.totalMarks}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-background-tertiary p-4 border border-border-secondary">
        <h4 className="mb-2 font-semibold text-foreground">Subjects</h4>
        <div className="flex flex-wrap gap-2">
          {Object.entries(course.examPattern.subjects).map(([subject, questions]) => (
            <span
              key={subject}
              className="rounded-full bg-primary-100 px-3 py-1 text-xs font-medium text-primary-800"
            >
              {subject}: {questions} questions
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-md bg-background-tertiary p-4 border border-border-secondary">
        <div className="flex justify-between text-sm">
          <span className="text-foreground-secondary">
            <strong className="text-foreground">Marking Scheme:</strong> {course.examPattern.markingScheme}
          </span>
          <span className="text-foreground-secondary">
            <strong className="text-foreground">Passing Marks:</strong> {course.examPattern.passingMarks}
          </span>
        </div>
      </div>

      <button className="mt-6 w-full rounded-md bg-primary-600 py-2 text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
        Learn More
      </button>
    </div>
  )
} 