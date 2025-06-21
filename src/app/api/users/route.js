import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { 
  successResponse, 
  errorResponse, 
  validationError, 
  authError, 
  forbiddenError,
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

// Validate user data
function validateUserData(data, isUpdate = false) {
  const errors = [];

  if (!isUpdate) {
    if (!data.username || data.username.trim().length === 0) {
      errors.push('Username is required');
    }
    if (!data.email || data.email.trim().length === 0) {
      errors.push('Email is required');
    }
    if (!data.password || data.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
  }

  if (data.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Invalid email format');
    }
  }

  if (data.role && !['admin', 'editor', 'user'].includes(data.role)) {
    errors.push('Invalid role');
  }

  return errors;
}

// GET - Get all users (admin only)
export async function GET(request) {
  try {
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

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';

    // Build query
    const query = { isActive: true };
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (role) {
      query.role = role;
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments(query);

    return successResponse({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }, 'Users retrieved successfully');

  } catch (error) {
    console.error('Get users error:', error);
    return internalServerError();
  }
}

// POST - Create new user (admin only)
export async function POST(request) {
  try {
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

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return validationError('Invalid JSON in request body');
    }

    // Validate user data
    const validationErrors = validateUserData(body);
    if (validationErrors.length > 0) {
      return validationError(validationErrors.join(', '));
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email: body.email.toLowerCase() },
        { username: body.username }
      ]
    });

    if (existingUser) {
      return validationError('User with this email or username already exists');
    }

    // Create new user
    const newUser = new User({
      username: body.username,
      email: body.email.toLowerCase(),
      password: body.password,
      role: body.role || 'user',
      permissions: body.permissions || [],
      isActive: true
    });

    await newUser.save();

    return successResponse(
      { user: newUser.toJSON() },
      'User created successfully',
      201
    );

  } catch (error) {
    console.error('Create user error:', error);
    return internalServerError();
  }
}

// Handle unsupported methods
export async function PUT() {
  return methodNotAllowedError();
}

export async function DELETE() {
  return methodNotAllowedError();
} 