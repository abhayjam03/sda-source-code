import { NextRequest, NextResponse } from 'next/server';
import { successResponse, authError, methodNotAllowedError } from '@/lib/api-utils';

export async function POST(request) {
  try {
    // Logout is handled on the client side by clearing the auth store
    // This endpoint can be used for server-side logout if needed in the future
    
    return successResponse(
      { message: 'Logged out successfully' },
      'Logout successful'
    );
  } catch (error) {
    console.error('Logout error:', error);
    return authError('Logout failed');
  }
}

// Handle unsupported methods
export async function GET() {
  return methodNotAllowedError();
}

export async function PUT() {
  return methodNotAllowedError();
}

export async function DELETE() {
  return methodNotAllowedError();
} 