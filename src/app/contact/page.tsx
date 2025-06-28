'use client'

import { useEffect, useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { getAcademyInfo, getTestimonials } from '@/services/mock';

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-primary py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg">Get in touch with us for any inquiries or to schedule a visit.</p>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-foreground">Contact Information</h2>
          <div className="space-y-4 text-lg text-foreground-secondary">
            <p><strong className="text-foreground">Phone:</strong> {academyInfo.contact.phone}</p>
            <p><strong className="text-foreground">Email:</strong> {academyInfo.contact.email}</p>
            <p><strong className="text-foreground">Address:</strong> {academyInfo.contact.address}</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-background-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Send Us a Message</h2>
          <form className="mx-auto max-w-md space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" 
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2" 
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-foreground shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full rounded-md bg-primary-600 py-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
            >
              Send Message
            </button>
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

      {/* Map Section */}
      <div className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-foreground">Find Us</h2>
          <div className="mx-auto max-w-4xl">
            <div className="aspect-w-16 aspect-h-9 rounded-lg bg-background-tertiary border border-border">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-foreground-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="mt-2 text-foreground-secondary">Map placeholder - Pathankot, Punjab</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 