import { getAcademyInfo, getTestimonials } from '../../services/mock';

export default async function AdmissionPage() {
  const [academyInfo, testimonials] = await Promise.all([
    getAcademyInfo(),
    getTestimonials()
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Admission Process</h1>
          <p className="mx-auto max-w-2xl text-lg">Learn about our admission requirements and how to apply to Surya Defence Academy.</p>
        </div>
      </div>

      {/* Admission Requirements Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Admission Requirements</h2>
          <ul className="mb-6 list-disc pl-6 text-lg text-foreground-secondary space-y-2">
            <li>Minimum age of 17 years</li>
            <li>Educational qualification as per course requirements</li>
            <li>Physical fitness standards</li>
            <li>Medical fitness certificate</li>
          </ul>
          <h2 className="mb-6 text-3xl font-bold text-foreground">How to Apply</h2>
          <p className="mb-6 text-lg text-foreground-secondary">
            To apply, please contact us at <a href={`tel:${academyInfo.contact}`} className="text-accent-500 hover:text-accent-600 transition-colors">{academyInfo.contact}</a> or visit our academy for more information.
          </p>
          <button className="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors">
            Apply Now
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-background-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">What Our Students Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-lg bg-background p-6 text-center border border-border shadow-brand">
                <p className="mb-4 text-foreground-secondary">{testimonial.content}</p>
                <p className="font-bold text-foreground">{testimonial.name}</p>
                <p className="text-foreground-tertiary">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 