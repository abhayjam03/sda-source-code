import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Course from '@/models/Course';

// GET - Fetch single course
export async function GET(request, { params }) {
  try {
    await connectDB();
    const course = await Course.findById(params.id).populate('updatedBy', 'username email');
    
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    
    return NextResponse.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update course
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const data = await request.json();
    
    const course = await Course.findByIdAndUpdate(
      params.id,
      {
        ...data,
        lastUpdated: new Date()
      },
      { new: true }
    ).populate('updatedBy', 'username email');
    
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    
    return NextResponse.json(course);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete course
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const course = await Course.findByIdAndDelete(params.id);
    
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 