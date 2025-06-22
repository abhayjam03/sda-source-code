import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';

// GET - Fetch all courses
export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find().populate('updatedBy', 'username email').sort({ createdAt: -1 });
    return NextResponse.json(courses);
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