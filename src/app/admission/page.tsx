import { getAcademyInfo, getTestimonials } from '../../services/academyService';

export default async function AdmissionPage() {
  const [academyInfo, testimonials] = await Promise.all([
    getAcademyInfo(),
    getTestimonials()
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Admission Process</h1>
          <p className="mx-auto max-w-2xl text-lg">Learn about our admission requirements and how to apply to Surya Defence Academy.</p>
        </div>
      </div>

      {/* Admission Requirements Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Admission Requirements</h2>
          <ul className="mb-6 list-disc pl-6 text-lg text-gray-700">
            <li>Minimum age of 17 years</li>
            <li>Educational qualification as per course requirements</li>
            <li>Physical fitness standards</li>
            <li>Medical fitness certificate</li>
          </ul>
          <h2 className="mb-6 text-3xl font-bold text-gray-900">How to Apply</h2>
          <p className="mb-6 text-lg text-gray-700">To apply, please contact us at <a href={`tel:${academyInfo.contact}`} className="text-red-600 hover:underline">{academyInfo.contact}</a> or visit our academy for more information.</p>
          <button className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700">Apply Now</button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">What Our Students Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-lg bg-gray-50 p-6 text-center">
                <p className="mb-4 text-gray-700">{testimonial.content}</p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-600">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 