import Image from "next/image";
import HeroSection from "@/components/home/Hero-section";
import ContactUs from "@/components/home/contact-us";
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <HeroSection name={"sda-academy"} name2={"name2"}/>

      {/* About Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-8">Why Choose Shaurya Defence Academy?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg leading-relaxed">
              At Shaurya Defence Academy, we are committed to providing top-notch coaching for defence aspirants preparing for NDA, CDS, AFCAT, SSB, and other examinations. Located in Pathankot, Punjab, our academy has a proven track record of success, driven by a passionate and experienced faculty.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-xl shadow text-center">
              <h3 className="font-bold text-xl mb-2">Expert Faculty</h3>
              <p>Trained professionals with defence backgrounds and years of experience.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl shadow text-center">
              <h3 className="font-bold text-xl mb-2">Comprehensive Curriculum</h3>
              <p>We cover all aspects: academics, physical training, and personality development.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl shadow text-center">
              <h3 className="font-bold text-xl mb-2">SSB Interview Prep</h3>
              <p>In-depth training for SSB interviews with mock sessions and feedback.</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl shadow text-center">
              <h3 className="font-bold text-xl mb-2">Results Oriented</h3>
              <p>High selection rate in NDA, CDS, and other defence services exams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Our Courses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['NDA Coaching', 'CDS Coaching', 'SSB Interview Prep', 'AFCAT Coaching', 'Physical Training', 'Spoken English'].map((course) => (
              <div key={course} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="font-bold text-xl mb-2">{course}</h3>
                <p className="text-gray-600">High-quality content and expert guidance for your success.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
     <ContactUs/>
    </main>
  );
}


