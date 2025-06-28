import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Force from '@/models/Force';
import User from '@/models/User';

// GET - Fetch single force
export async function GET(request, { params }) {
  try {
    await connectDB();
    const force = await Force.findById(params.id).populate('updatedBy', 'username email');
    
    if (!force) {
      return NextResponse.json({ error: 'Force not found' }, { status: 404 });
    }
    
    return NextResponse.json(force);
  } catch (error) {
    console.error('Error fetching force:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update force
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const data = await request.json();
    
    const force = await Force.findByIdAndUpdate(
      params.id,
      {
        ...data,
        lastUpdated: new Date()
      },
      { new: true }
    ).populate('updatedBy', 'username email');
    
    if (!force) {
      return NextResponse.json({ error: 'Force not found' }, { status: 404 });
    }
    
    return NextResponse.json(force);
  } catch (error) {
    console.error('Error updating force:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete force
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const force = await Force.findByIdAndDelete(params.id);
    
    if (!force) {
      return NextResponse.json({ error: 'Force not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Force deleted successfully' });
  } catch (error) {
    console.error('Error deleting force:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 