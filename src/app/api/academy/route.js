import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Academy from '@/models/Academy';
import User from '@/models/User';

// GET - Fetch academy information
export async function GET() {
  try {
    await connectDB();
    const academy = await Academy.findOne().populate('updatedBy', 'username email');
    
    if (!academy) {
      return NextResponse.json({ error: 'Academy information not found' }, { status: 404 });
    }
    
    return NextResponse.json(academy);
  } catch (error) {
    console.error('Error fetching academy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT - Update academy information
export async function PUT(request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Find existing academy or create new one
    let academy = await Academy.findOne();
    
    if (academy) {
      // Update existing academy
      Object.assign(academy, data);
      academy.lastUpdated = new Date();
      await academy.save();
    } else {
      // Create new academy
      academy = new Academy({
        ...data,
        lastUpdated: new Date()
      });
      await academy.save();
    }
    
    return NextResponse.json(academy);
  } catch (error) {
    console.error('Error updating academy:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 