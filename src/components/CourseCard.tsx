import { Course } from '../types/academy';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="group rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl">
      <h3 className="mb-4 text-2xl font-bold text-gray-900">{course.title}</h3>
      <p className="mb-6 text-gray-600">{course.description}</p>
      
      <div className="space-y-4">
        <div className="rounded-md bg-gray-50 p-4">
          <h4 className="mb-2 font-semibold text-gray-900">Exam Pattern</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Mode:</span> {course.examPattern.mode}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {course.examPattern.duration}
            </div>
            <div>
              <span className="font-medium">Total Questions:</span> {course.examPattern.totalQuestions}
            </div>
            <div>
              <span className="font-medium">Total Marks:</span> {course.examPattern.totalMarks}
            </div>
          </div>
        </div>

        <div className="rounded-md bg-gray-50 p-4">
          <h4 className="mb-2 font-semibold text-gray-900">Subjects</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(course.examPattern.subjects).map(([subject, questions]) => (
              <div key={subject}>
                <span className="font-medium">{subject}:</span> {questions} questions
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-md bg-gray-50 p-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Marking Scheme:</span> {course.examPattern.markingScheme}
            </div>
            <div>
              <span className="font-medium">Passing Marks:</span> {course.examPattern.passingMarks}
            </div>
          </div>
        </div>
      </div>

      <button className="mt-6 w-full rounded-md bg-red-600 py-2 text-white transition-colors hover:bg-red-700">
        Learn More
      </button>
    </div>
  );
} 