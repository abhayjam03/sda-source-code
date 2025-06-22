import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

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

export async function GET(request) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Authorization header is required',
          error: 'MISSING_AUTH_HEADER'
        },
        { status: 401 }
      );
    }

    // Extract token
    const token = extractToken(authHeader);
    if (!token) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid authorization header format',
          error: 'INVALID_AUTH_HEADER'
        },
        { status: 401 }
      );
    }

    // Verify JWT token
    const payload = await verifyJWT(token);
    if (!payload) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Invalid or expired token',
          error: 'INVALID_TOKEN'
        },
        { status: 401 }
      );
    }

    // Connect to database
    try {
      await connectDB();
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

    // Find user by ID
    const user = await User.findById(payload.userId);

    if (!user) {
      return NextResponse.json(
        { 
          success: false,
          message: 'User not found',
          error: 'USER_NOT_FOUND'
        },
        { status: 401 }
      );
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        { 
          success: false,
          message: 'Account is deactivated',
          error: 'ACCOUNT_DEACTIVATED'
        },
        { status: 401 }
      );
    }

    // Return user data
    return NextResponse.json({
      success: true,
      message: 'User data retrieved successfully',
      data: {
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
          permissions: user.permissions,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Get user error:', error);
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
export async function POST() {
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