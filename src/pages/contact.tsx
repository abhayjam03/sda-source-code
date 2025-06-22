import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-[#1a237e] text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">Pathankot Branch</h1>
          <p className="text-lg text-center max-w-2xl mx-auto text-gray-200">
            Join Our School Integrated Program (NDA+Schooling+SSB) For The Session 2025-2026
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Section */}
          <div className="bg-white border border-gray-200 rounded-md p-6">
            <h2 className="text-2xl font-bold text-[#1a237e] mb-6">Enquiry Now</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Select Course</label>
                <select className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-[#1a237e] focus:border-[#1a237e]">
                  <option value="">Select a course</option>
                  <option value="nda">NDA</option>
                  <option value="nda-foundation">NDA Foundation</option>
                  <option value="cds-afcat">CDS/AFCAT</option>
                  <option value="ssb">SSB</option>
                  <option value="sainik-school">Sainik School</option>
                  <option value="iit-jee">IIT-JEE</option>
                  <option value="neet">NEET</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-[#1a237e] focus:border-[#1a237e]"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-[#1a237e] focus:border-[#1a237e]"
                  placeholder="+91 1234567890"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-[#1a237e] focus:border-[#1a237e]"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2.5 rounded border border-gray-300 focus:ring-1 focus:ring-[#1a237e] focus:border-[#1a237e]"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#1a237e] text-white py-3 rounded font-semibold hover:bg-[#283593] transition-colors duration-300"
              >
                Submit Enquiry
              </button>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-6">
            {/* Contact Cards */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white border border-gray-200 rounded-md p-5">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#e8eaf6] p-2.5 rounded-full">
                    <FaMapMarkerAlt size={20} color="#1a237e" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Address</h3>
                    <p className="text-gray-600 text-sm">
                      2nd Floor, Dalhousie Road,<br />
                      opp. Kotak Mahindra Bank,<br />
                      Pathankot, Punjab 145001
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-md p-5">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#e8eaf6] p-2.5 rounded-full">
                    <FaPhone size={20} color="#1a237e" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone</h3>
                    <a href="tel:+917888714322" className="text-gray-600 text-sm hover:text-[#1a237e]">
                      +91 7888714322
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-md p-5">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#e8eaf6] p-2.5 rounded-full">
                    <FaEnvelope size={20} color="#1a237e" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a href="mailto:chanakyadefencegroup@gmail.com" className="text-gray-600 text-sm hover:text-[#1a237e]">
                      chanakyadefencegroup@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-md p-5">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#e8eaf6] p-2.5 rounded-full">
                    <FaClock size={20} color="#1a237e" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Working Hours</h3>
                    <p className="text-gray-600 text-sm">
                      Monday - Saturday<br />
                      09:00 - 20:00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://wa.me/917888714322"
                className="flex items-center justify-center space-x-2 bg-[#25D366] text-white py-3 px-6 rounded hover:bg-[#128C7E] transition-colors"
              >
                <FaWhatsapp size={20} />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+917888714322"
                className="flex items-center justify-center space-x-2 bg-[#1a237e] text-white py-3 px-6 rounded hover:bg-[#283593] transition-colors"
              >
                <FaPhone size={20} />
                <span>Call Us</span>
              </a>
            </div>

            {/* Map Section */}
            <div className="bg-white border border-gray-200 rounded-md p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Location</h3>
              <div className="aspect-w-16 aspect-h-9 rounded overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3375.9195155713!2d75.6497!3d32.2688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDE2JzA3LjciTiA3NcKwMzgnNTguOSJF!5e0!3m2!1sen!2sin!4v1635000000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 