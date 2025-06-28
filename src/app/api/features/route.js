import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Academy from '@/models/Academy';

// GET - Fetch features data from academy facilities
export async function GET() {
  try {
    await connectDB();
    
    // Try to get the first academy from database
    const academy = await Academy.findOne({ isActive: true }).sort({ createdAt: -1 });
    
    if (academy && academy.facilities && academy.facilities.length > 0) {
      // Convert academy facilities to features format
      const features = academy.facilities.map((facility, index) => ({
        title: facility,
        description: `State-of-the-art ${facility.toLowerCase()} for optimal learning experience`,
        icon: `facility-${index + 1}`
      }));
      
      return NextResponse.json(features);
    } else {
      // Return default features if no academy data found
      const defaultFeatures = [
        {
          title: "Expert Training",
          description: "Comprehensive training in both physical and written aspects of defence exams",
          icon: "training"
        },
        {
          title: "Modern Facilities",
          description: "State-of-the-art infrastructure for optimal learning experience",
          icon: "facilities"
        },
        {
          title: "Experienced Faculty",
          description: "Learn from retired defence personnel and subject matter experts",
          icon: "faculty"
        },
        {
          title: "Personalized Coaching",
          description: "Individual attention and customized study plans for each student",
          icon: "coaching"
        },
        {
          title: "Mock Tests & Practice",
          description: "Regular mock tests and practice sessions to improve performance",
          icon: "practice"
        },
        {
          title: "Career Guidance",
          description: "Professional career counseling and guidance for defence careers",
          icon: "guidance"
        }
      ];
      
      return NextResponse.json(defaultFeatures);
    }
  } catch (error) {
    console.error('Error fetching features:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 