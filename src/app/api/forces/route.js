import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Force from '@/models/Force';

// GET - Fetch all forces
export async function GET() {
  try {
    await connectDB();
    const forces = await Force.find().populate('updatedBy', 'username email').sort({ createdAt: -1 });
    return NextResponse.json(forces);
  } catch (error) {
    console.error('Error fetching forces:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create new force
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    const force = new Force({
      ...data,
      lastUpdated: new Date()
    });
    
    await force.save();
    return NextResponse.json(force, { status: 201 });
  } catch (error) {
    console.error('Error creating force:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 