import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';
import User from '@/models/User';

// GET - Fetch all courses
export async function GET() {
  try {
    console.log("connectDB -1 ");
    await connectDB();
    console.log("courses");
    const courses = await Course.find({}, {
      name: 1,
      code: 1,
      category: 1,
      description: 1,
      duration: 1,
      images: 1,
      fee: 1
    })
    .populate('updatedBy', 'username email') // include only if needed
    .sort({ createdAt: -1 });
    
    console.log("courses", courses);
    // Return empty array if no courses found
    return NextResponse.json(courses || []);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new course
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const course = new Course({
      ...data,
      lastUpdated: new Date()
    });
    
    await course.save();
    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 