'use client'

import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactUs from '@/components/home/contact-us'

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
]

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <ContactUs />
      <Footer />
    </div>
  )
} 