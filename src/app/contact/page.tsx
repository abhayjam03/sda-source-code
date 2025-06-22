'use client'

import { useEffect, useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { getAcademyInfo, getTestimonials } from '@/services/academyService';

const contactInfo = [
  {
    name: 'Chandigarh Branch',
    address: 'SCO No. 218-219, 1st Floor, Sector 34A, Sector 34, Chandigarh, 160034',
    phone: '+91 7508149548',
    email: 'chankyadefencegroupchd@gmail.com',
  },
  {
    name: 'Pathankot Branch',
    address: '2nd Floor, Dalhousie Road, opp. Kotak Mahindra Bank, Pathankot, Punjab 145001',
    phone: '+91 7888714322',
    email: 'chanakyadefencegroup@gmail.com',
  },
];

export default function ContactPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [academyInfo, setAcademyInfo] = useState<any>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [info, test] = await Promise.all([
          getAcademyInfo(),
          getTestimonials()
        ]);
        setAcademyInfo(info);
        setTestimonials(test);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    setHasMounted(true);
  }, []);

  if (!hasMounted || !academyInfo) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-red-600 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg">Get in touch with us for any inquiries or to schedule a visit.</p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-gray-900">Contact Information</h2>
          <p className="mb-2 text-lg text-gray-700"><strong>Phone:</strong> {academyInfo.contact.phone}</p>
          <p className="mb-2 text-lg text-gray-700"><strong>Email:</strong> {academyInfo.contact.email}</p>
          <p className="mb-2 text-lg text-gray-700"><strong>Address:</strong> {academyInfo.contact.address}</p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">Send Us a Message</h2>
          <form className="mx-auto max-w-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"></textarea>
            </div>
            <button type="submit" className="w-full rounded-md bg-red-600 py-2 text-white hover:bg-red-700">Send Message</button>
          </form>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">What Our Students Say</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-lg bg-white p-6 shadow-lg">
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