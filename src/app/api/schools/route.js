import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import School from '@/models/School';
import User from '@/models/User';

// GET - Fetch all schools
export async function GET() {
  try {
    await connectDB();
    const schools = await School.find().populate('updatedBy', 'username email').sort({ createdAt: -1 });
    // Return empty array if no schools found
    return NextResponse.json(schools || []);
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new school
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const school = new School({
      ...data,
      lastUpdated: new Date()
    });
    
    await school.save();
    return NextResponse.json(school, { status: 201 });
  } catch (error) {
    console.error('Error creating school:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 