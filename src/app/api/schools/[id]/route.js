import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import School from '@/models/School';
import User from '@/models/User';

// GET - Fetch single school
export async function GET(request, { params }) {
  try {
    await connectDB();
    const school = await School.findById(params.id).populate('updatedBy', 'username email');
    
    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }
    
    return NextResponse.json(school);
  } catch (error) {
    console.error('Error fetching school:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update school
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const data = await request.json();
    
    const school = await School.findByIdAndUpdate(
      params.id,
      {
        ...data,
        lastUpdated: new Date()
      },
      { new: true }
    ).populate('updatedBy', 'username email');
    
    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }
    
    return NextResponse.json(school);
  } catch (error) {
    console.error('Error updating school:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete school
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const school = await School.findByIdAndDelete(params.id);
    
    if (!school) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'School deleted successfully' });
  } catch (error) {
    console.error('Error deleting school:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 