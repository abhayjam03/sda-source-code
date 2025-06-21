import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { 
  successResponse, 
  validationError, 
  authError, 
  forbiddenError,
  notFoundError,
  methodNotAllowedError,
  internalServerError 
} from '@/lib/api-utils';

// JWT verification using Web Crypto API
async function verifyJWT(token) {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    
    const textEncoder = new TextEncoder();
    const keyData = textEncoder.encode(secret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const signature = Uint8Array.from(atob(signatureB64), c => c.charCodeAt(0));
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      textEncoder.encode(`${headerB64}.${payloadB64}`)
    );

    if (!isValid) return null;

    const payload = JSON.parse(atob(payloadB64));
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp < now) return null;
    
    return payload;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

// Extract token from authorization header
function extractToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}

// Validate user update data
function validateUserUpdateData(data) {
  const errors = [];

  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }

  if (data.role && !['admin', 'editor', 'user'].includes(data.role)) {
    errors.push('Invalid role');
  }

  if (data.password && data.password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  return errors;
}

// GET - Get user by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return authError('Authorization header is required');
    }

    const token = extractToken(authHeader);
    if (!token) {
      return authError('Invalid authorization header format');
    }

    const payload = await verifyJWT(token);
    if (!payload) {
      return authError('Invalid or expired token');
    }

    // Connect to database
    await connectDB();

    // Get current user
    const currentUser = await User.findById(payload.userId);
    if (!currentUser || !currentUser.isActive) {
      return authError('User not found or inactive');
    }

    // Check if user is admin or requesting their own data
    if (currentUser.role !== 'admin' && payload.userId !== id) {
      return forbiddenError('Access denied');
    }

    // Get user by ID
    const user = await User.findById(id).select('-password');
    if (!user) {
      return notFoundError('User not found');
    }

    return successResponse({ user }, 'User retrieved successfully');

  } catch (error) {
    console.error('Get user error:', error);
    return internalServerError();
  }
}

// PUT - Update user
export async function PUT(request, { params }) {
  try {
    const { id } = params;

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return authError('Authorization header is required');
    }

    const token = extractToken(authHeader);
    if (!token) {
      return authError('Invalid authorization header format');
    }

    const payload = await verifyJWT(token);
    if (!payload) {
      return authError('Invalid or expired token');
    }

    // Connect to database
    await connectDB();

    // Get current user
    const currentUser = await User.findById(payload.userId);
    if (!currentUser || !currentUser.isActive) {
      return authError('User not found or inactive');
    }

    // Check if user is admin or updating their own data
    if (currentUser.role !== 'admin' && payload.userId !== id) {
      return forbiddenError('Access denied');
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return validationError('Invalid JSON in request body');
    }

    // Validate update data
    const validationErrors = validateUserUpdateData(body);
    if (validationErrors.length > 0) {
      return validationError(validationErrors.join(', '));
    }

    // Get user to update
    const user = await User.findById(id);
    if (!user) {
      return notFoundError('User not found');
    }

    // Check if email is being changed and if it already exists
    if (body.email && body.email.toLowerCase() !== user.email) {
      const existingUser = await User.findOne({ 
        email: body.email.toLowerCase(),
        _id: { $ne: id }
      });
      if (existingUser) {
        return validationError('Email already exists');
      }
    }

    // Update user fields
    const updateFields = {};
    if (body.username) updateFields.username = body.username;
    if (body.email) updateFields.email = body.email.toLowerCase();
    if (body.password) updateFields.password = body.password;
    if (body.role && currentUser.role === 'admin') updateFields.role = body.role;
    if (body.permissions && currentUser.role === 'admin') updateFields.permissions = body.permissions;
    if (typeof body.isActive === 'boolean' && currentUser.role === 'admin') updateFields.isActive = body.isActive;

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true }
    ).select('-password');

    return successResponse({ user: updatedUser }, 'User updated successfully');

  } catch (error) {
    console.error('Update user error:', error);
    return internalServerError();
  }
}

// DELETE - Delete user (soft delete)
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return authError('Authorization header is required');
    }

    const token = extractToken(authHeader);
    if (!token) {
      return authError('Invalid authorization header format');
    }

    const payload = await verifyJWT(token);
    if (!payload) {
      return authError('Invalid or expired token');
    }

    // Connect to database
    await connectDB();

    // Get current user
    const currentUser = await User.findById(payload.userId);
    if (!currentUser || !currentUser.isActive) {
      return authError('User not found or inactive');
    }

    // Check if user is admin
    if (currentUser.role !== 'admin') {
      return forbiddenError('Admin access required');
    }

    // Prevent self-deletion
    if (payload.userId === id) {
      return validationError('Cannot delete your own account');
    }

    // Get user to delete
    const user = await User.findById(id);
    if (!user) {
      return notFoundError('User not found');
    }

    // Soft delete user
    user.isActive = false;
    await user.save();

    return successResponse({}, 'User deleted successfully');

  } catch (error) {
    console.error('Delete user error:', error);
    return internalServerError();
  }
}

// Handle unsupported methods
export async function POST() {
  return methodNotAllowedError();
} 