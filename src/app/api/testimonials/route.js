import { NextResponse } from 'next/server';

// GET - Fetch testimonials data (static content since no testimonials collection in DB)
export async function GET() {
  try {
    // Since there's no testimonials collection in the database schema,
    // we return static testimonials data
    const testimonials = [
      {
        name: "Rahul Sharma",
        role: "Army Officer",
        content: "Surya Defence Academy provided me with excellent training and guidance to achieve my dream of joining the Indian Army. The faculty's expertise and personalized attention made all the difference.",
        image: "/images/testimonials/testimonial-1.jpg"
      },
      {
        name: "Priya Singh",
        role: "Air Force Officer",
        content: "The comprehensive training program at Surya Defence Academy helped me clear the AFCAT exam with flying colors. The mock tests and practice sessions were invaluable.",
        image: "/images/testimonials/testimonial-2.jpg"
      },
      {
        name: "Amit Kumar",
        role: "Navy Officer",
        content: "I'm grateful to Surya Defence Academy for their professional approach and dedicated faculty. They helped me understand the exam pattern and prepare strategically.",
        image: "/images/testimonials/testimonial-3.jpg"
      },
      {
        name: "Sneha Patel",
        role: "CRPF Officer",
        content: "The academy's focus on both physical and mental preparation was crucial for my success. The experienced faculty guided me through every step of the process.",
        image: "/images/testimonials/testimonial-4.jpg"
      },
      {
        name: "Vikram Malhotra",
        role: "Delhi Police Officer",
        content: "Surya Defence Academy's structured approach and regular assessments helped me stay on track. The faculty's support and motivation were key to my success.",
        image: "/images/testimonials/testimonial-5.jpg"
      },
      {
        name: "Anjali Verma",
        role: "SSC GD Officer",
        content: "The academy's comprehensive study material and expert guidance made the SSC GD exam preparation much easier. I highly recommend Surya Defence Academy.",
        image: "/images/testimonials/testimonial-6.jpg"
      }
    ];
    
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 