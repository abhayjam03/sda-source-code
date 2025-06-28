import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';

// GET - Fetch featured courses
export async function GET() {
  try {
    await connectDB();
    
    // Fetch courses that are marked as featured
    const featuredCourses = await Course.find(
      { isFeatured: true, isActive: true },
      {
        name: 1,
        code: 1,
        category: 1,
        description: 1,
        duration: 1,
        images: 1,
        fee: 1,
        type: 1,
        isPopular: 1,
        successRate: 1
      }
    )
    .populate('updatedBy', 'username email')
    .sort({ createdAt: -1 })
    .limit(6); // Limit to 6 featured courses
    
    // Return empty array if no featured courses found
    return NextResponse.json(featuredCourses || []);
  } catch (error) {
    console.error('Error fetching featured courses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 