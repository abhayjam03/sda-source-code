import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { 
  successResponse, 
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

// GET - Get dashboard data
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

    // Get dashboard statistics
    const [
      totalUsers,
      activeUsers,
      adminUsers,
      editorUsers,
      regularUsers,
      recentUsers,
      usersByRole
    ] = await Promise.all([
      // Total users
      User.countDocuments({ isActive: true }),
      
      // Active users (logged in within last 30 days)
      User.countDocuments({
        isActive: true,
        lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      }),
      
      // Admin users
      User.countDocuments({ isActive: true, role: 'admin' }),
      
      // Editor users
      User.countDocuments({ isActive: true, role: 'editor' }),
      
      // Regular users
      User.countDocuments({ isActive: true, role: 'user' }),
      
      // Recent users (last 7 days)
      User.find({ 
        isActive: true,
        createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
      })
      .select('username email role createdAt')
      .sort({ createdAt: -1 })
      .limit(5),
      
      // Users by role aggregation
      User.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$role', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
    ]);

    // Calculate user growth (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const usersLast30Days = await User.countDocuments({
      isActive: true,
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Get login activity (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const loginActivity = await User.aggregate([
      {
        $match: {
          isActive: true,
          lastLogin: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$lastLogin'
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Prepare dashboard data
    const dashboardData = {
      overview: {
        totalUsers,
        activeUsers,
        inactiveUsers: totalUsers - activeUsers,
        userGrowth: usersLast30Days
      },
      userRoles: {
        admin: adminUsers,
        editor: editorUsers,
        user: regularUsers
      },
      recentActivity: {
        newUsers: recentUsers,
        loginActivity: loginActivity.map(item => ({
          date: item._id,
          count: item.count
        }))
      },
      charts: {
        usersByRole: usersByRole.map(item => ({
          role: item._id,
          count: item.count
        }))
      }
    };

    return successResponse(dashboardData, 'Dashboard data retrieved successfully');

  } catch (error) {
    console.error('Dashboard error:', error);
    return internalServerError();
  }
}

// Handle unsupported methods
export async function POST() {
  return methodNotAllowedError();
}

export async function PUT() {
  return methodNotAllowedError();
}

export async function DELETE() {
  return methodNotAllowedError();
} 