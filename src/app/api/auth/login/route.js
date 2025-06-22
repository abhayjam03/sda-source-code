import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// Simple JWT implementation using Web Crypto API
async function signJWT(payload) {
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    
    const tokenPayload = {
      ...payload,
      iat: now,
      exp: now + (24 * 60 * 60) // 24 hours
    };

    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(tokenPayload));
    
    const textEncoder = new TextEncoder();
    const keyData = textEncoder.encode(secret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign(
      'HMAC',
      key,
      textEncoder.encode(`${encodedHeader}.${encodedPayload}`)
    );

    const signatureBase64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
    return `${encodedHeader}.${encodedPayload}.${signatureBase64}`;
  } catch (error) {
    console.error('JWT signing error:', error);
    throw new Error('Failed to generate token');
  }
}

// Validate request body
function validateLoginRequest(body) {
  const { email, password } = body;
  
  if (!email || !password) {
    return { isValid: false, error: 'Email and password are required' };
  }
  
  if (typeof email !== 'string' || typeof password !== 'string') {
    return { isValid: false, error: 'Email and password must be strings' };
  }
  
  if (email.trim().length === 0 || password.trim().length === 0) {
    return { isValid: false, error: 'Email and password cannot be empty' };
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Invalid email format' };
  }
  
  return { isValid: true };
}

export async function POST(request) {
  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid JSON in request body',
          error: 'INVALID_JSON'
        },
        { status: 400 }
      );
    }

    // Validate request
    const validation = validateLoginRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false,
          message: validation.error,
          error: 'VALIDATION_ERROR'
        },
        { status: 400 }
      );
    }

    const { email, password } = body;

    console.log('Login attempt for email:', email);

    // Connect to database
    try {
      await connectDB();
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { 
          success: false,
          message: 'Database connection failed',
          error: 'DB_CONNECTION_ERROR'
        },
        { status: 500 }
      );
    }

    // Find user by email
    console.log('Searching for user with email:', email.toLowerCase());
    const user = await User.findOne({ email: email.toLowerCase() });

    console.log('User found:', user ? 'Yes' : 'No');
    if (user) {
      console.log('User details:', {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        isActive: user.isActive
      });
    } else {
      console.log('No user found with email:', email.toLowerCase());
    }

    if (!user) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid credentials',
          error: 'INVALID_CREDENTIALS'
        },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Account is deactivated. Please contact administrator.',
          error: 'ACCOUNT_DEACTIVATED'
        },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid credentials',
          error: 'INVALID_CREDENTIALS'
        },
        { status: 401 }
      );
    }

    // Update last login
    try {
      user.lastLogin = new Date();
      await user.save();
    } catch (saveError) {
      console.error('Error updating last login:', saveError);
      // Don't fail the login if last login update fails
    }

    // Generate JWT token
    const token = await signJWT({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          permissions: user.permissions,
          lastLogin: user.lastLogin
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Login error:', error);
    
    // Handle specific errors
    if (error.message === 'Failed to generate token') {
      return NextResponse.json(
        { 
          success: false,
          message: 'Authentication service error',
          error: 'TOKEN_GENERATION_ERROR'
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: false,
        message: 'Internal server error',
        error: 'INTERNAL_SERVER_ERROR'
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { 
      success: false,
      message: 'Method not allowed',
      error: 'METHOD_NOT_ALLOWED'
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { 
      success: false,
      message: 'Method not allowed',
      error: 'METHOD_NOT_ALLOWED'
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { 
      success: false,
      message: 'Method not allowed',
      error: 'METHOD_NOT_ALLOWED'
    },
    { status: 405 }
  );
} 