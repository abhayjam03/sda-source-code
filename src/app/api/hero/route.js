import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Academy from '@/models/Academy';

// GET - Fetch hero section data from academy information
export async function GET() {
  try {
    await connectDB();
    
    // Try to get the first academy from database
    const academy = await Academy.findOne({ isActive: true }).sort({ createdAt: -1 });
    
    if (academy) {
      // Construct hero section from academy data
      const heroSection = {
        title: academy.name || "Surya Defence Academy",
        subtitle: academy.location?.city || "Pathankot",
        description: academy.description || "Your Gateway to Defence Services",
        image: academy.images?.[0] || "/images/hero-banner.jpg"
      };
      
      return NextResponse.json(heroSection);
    } else {
      // Return default hero section if no academy data found
      const defaultHeroSection = {
        title: "Surya Defence Academy",
        subtitle: "Pathankot",
        description: "Your Gateway to Defence Services",
        image: "/images/hero-banner.jpg"
      };
      
      return NextResponse.json(defaultHeroSection);
    }
  } catch (error) {
    console.error('Error fetching hero section:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 